-- ==============================================================================
-- QRLoop Supabase PostgreSQL Database Schema
-- Run this in your Supabase SQL Editor to initialize all tables, indexes, and RLS
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users Table (Application Auth & Profiles)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    plan_tier TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. QR Codes Table
CREATE TABLE IF NOT EXISTS qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    short_code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL DEFAULT 'Untitled Dynamic QR',
    qr_type TEXT NOT NULL DEFAULT 'url', -- 'url', 'text', 'wifi', 'vcard', 'email', 'phone'
    destination_url TEXT NOT NULL,
    raw_data TEXT, -- vCard details, Wi-Fi config string, etc.
    is_dynamic BOOLEAN DEFAULT true,
    style_config JSONB DEFAULT '{
        "fgColor": "#0F172A",
        "bgColor": "#FFFFFF",
        "dotStyle": "rounded",
        "eyeStyle": "rounded",
        "errorCorrection": "M",
        "logo": null,
        "logoSize": 20
    }'::jsonb,
    total_scans INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Scan Telemetry Logs Table
CREATE TABLE IF NOT EXISTS scan_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    qr_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
    short_code TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    device_type TEXT DEFAULT 'desktop', -- 'mobile', 'tablet', 'desktop', 'bot'
    os TEXT DEFAULT 'Unknown OS',
    browser TEXT DEFAULT 'Unknown Browser',
    country TEXT DEFAULT 'Unknown Country',
    city TEXT DEFAULT 'Unknown City',
    region TEXT DEFAULT 'Unknown Region',
    referer TEXT DEFAULT 'Direct',
    scanned_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_code ON qr_codes(short_code);
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_logs_qr_id ON scan_logs(qr_id);
CREATE INDEX IF NOT EXISTS idx_scan_logs_short_code ON scan_logs(short_code);
CREATE INDEX IF NOT EXISTS idx_scan_logs_scanned_at ON scan_logs(scanned_at DESC);

-- Trigger to increment total_scans on qr_codes when a scan_log is inserted
CREATE OR REPLACE FUNCTION increment_qr_scans()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE qr_codes
    SET total_scans = total_scans + 1,
        updated_at = TIMEZONE('utc'::text, NOW())
    WHERE id = NEW.qr_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_increment_scans ON scan_logs;
CREATE TRIGGER trigger_increment_scans
AFTER INSERT ON scan_logs
FOR EACH ROW
EXECUTE FUNCTION increment_qr_scans();

-- Row Level Security (RLS) Configuration
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read for shortcode redirects
CREATE POLICY "Public can view active dynamic QR codes for redirect"
ON qr_codes FOR SELECT
USING (is_active = true);

-- Allow public insert into scan_logs for recording redirects
CREATE POLICY "Public can insert scan logs"
ON scan_logs FOR INSERT
WITH CHECK (true);

-- Allow users to manage their own QR codes
CREATE POLICY "Users can manage own QR codes"
ON qr_codes FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to view scan logs for their own QR codes
CREATE POLICY "Users can view scan logs of their own QR codes"
ON scan_logs FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM qr_codes
        WHERE qr_codes.id = scan_logs.qr_id
        AND qr_codes.user_id = auth.uid()
    )
);

-- ==============================================================================
-- 4. Supabase Storage Setup (For Custom QR Logos & Brand Badges)
-- ==============================================================================

-- Create a public bucket for QR logos if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'qr-logos',
    'qr-logos',
    true,
    5242880, -- 5MB limit
    ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO UPDATE 
SET public = true, 
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];

-- Storage Access Policies
CREATE POLICY "Public Read for QR Logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'qr-logos');

CREATE POLICY "Allow Upload to QR Logos Bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'qr-logos');

-- Sample Initial Data (Demo Dynamic QR)
INSERT INTO qr_codes (
    short_code,
    title,
    qr_type,
    destination_url,
    is_dynamic,
    style_config
) VALUES (
    'welcome',
    'Welcome to QRLoop',
    'url',
    'https://github.com',
    true,
    '{"fgColor": "#0F172A", "bgColor": "#FFFFFF", "dotStyle": "rounded", "eyeStyle": "rounded", "errorCorrection": "M"}'::jsonb
) ON CONFLICT (short_code) DO NOTHING;

-- ==============================================================================
-- 5. Community Discussions Forum Schema (Multi-user global discussions)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS community_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT DEFAULT 'Community Member',
    content TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    upvotes INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS community_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES community_topics(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    role TEXT DEFAULT 'Community Member',
    text TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for blazing fast community lookups
CREATE INDEX IF NOT EXISTS idx_community_topics_category ON community_topics(category);
CREATE INDEX IF NOT EXISTS idx_community_topics_created_at ON community_topics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_replies_topic_id ON community_replies(topic_id);
CREATE INDEX IF NOT EXISTS idx_community_replies_created_at ON community_replies(created_at ASC);

-- Row Level Security (RLS) Configuration for Community
ALTER TABLE community_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to community discussions
CREATE POLICY "Public can view community topics"
ON community_topics FOR SELECT
USING (true);

-- Allow public write access to create new community discussions
CREATE POLICY "Public can insert community topics"
ON community_topics FOR INSERT
WITH CHECK (true);

-- Allow updating upvotes on community topics
CREATE POLICY "Public can update community topics upvotes"
ON community_topics FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow public read access to replies
CREATE POLICY "Public can view community replies"
ON community_replies FOR SELECT
USING (true);

-- Allow public write access to add replies
CREATE POLICY "Public can insert community replies"
ON community_replies FOR INSERT
WITH CHECK (true);

-- Allow updating upvotes on replies
CREATE POLICY "Public can update community replies upvotes"
ON community_replies FOR UPDATE
USING (true)
WITH CHECK (true);

-- Seed Initial High-Quality Discussions
INSERT INTO community_topics (
    id,
    title,
    category,
    category_label,
    author,
    role,
    content,
    tags,
    upvotes,
    is_pinned
) VALUES 
(
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'How to test your QR code before printing 10,000 flyers (The 10:1 distance rule)',
    'print-design',
    'Print & Design',
    'Marcus Vance',
    'Hospitality Director • Chicago',
    'Before sending any design file to an offset or digital printer, always calculate the maximum viewing distance.\n\nThe golden formula is the 10:1 distance-to-size ratio:\n• A tabletop standee viewed from 12 inches away requires at least a 1.2-inch (30mm) QR code.\n• A wall poster scanned from 5 feet (60 inches) away requires a 6-inch (150mm) QR code.\n• A storefront window banner viewed from 15 feet away needs a 1.5-foot (450mm) QR code.\n\nAlso always export as lossless vector SVG from QRLoop rather than PNG. Raster images get blurry at large scale, whereas SVG curves remain infinitely sharp for laser cutters and high-DPI plates.',
    '["printing", "svg", "dimensions", "menus"]'::jsonb,
    54,
    true
),
(
    'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    'Why did my smartphone camera fail to scan white-on-yellow QR codes? (Contrast guidelines)',
    'troubleshooting',
    'Troubleshooting',
    'Sarah Chen',
    'Tech Lead • Omnichannel',
    'A client asked us for a "pastel aesthetic" QR code with white dots on a pale lemon-yellow background. When printed, almost 70% of iOS and Android native camera apps could not lock focus or decode the matrix.\n\nHere is why:\nBarcode decoders rely on luminance contrast, not color contrast. Smartphone camera sensors first convert the image to grayscale before running edge detection. Light yellow and white have almost identical grayscale values.\n\nBest practice rule:\n1. Always maintain at least a 4:1 luminance ratio between foreground and background.\n2. Keep the finder eyes (the three corner squares) dark.\n3. If using light branding colors, put them on a dark charcoal or navy background instead.',
    '["contrast", "camera-focus", "accessibility", "colors"]'::jsonb,
    46,
    false
),
(
    'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    'Sunrise 2027: How retail brands should prepare for 2D GS1 Digital Link barcodes',
    'redirects',
    'Redirects & Analytics',
    'David K.',
    'Packaging Systems Architect',
    'The standard 1D linear UPC barcode is being phased out across global point-of-sale checkout registers by 2027 under GS1 "Sunrise 2027".\n\nBrands are transitioning to GS1 Digital Link 2D QR codes. A single QR code on a cereal box will both beep at the cash register and open allergen/promotional information when scanned by consumers.\n\nThe critical technical requirement is dynamic redirect routing: your packaging prints once and lasts for 2 years on retail shelves, while your marketing campaign landing pages change monthly.\n\nDynamic QR management platforms with persistent shortcodes like QRLoop ensure your packaging investments remain future-proof.',
    '["gs1", "retail", "packaging", "standards"]'::jsonb,
    38,
    false
)
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Community Replies
INSERT INTO community_replies (
    topic_id,
    author,
    role,
    text,
    upvotes,
    is_verified
) VALUES 
(
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'Elena Rostova',
    'Brand Designer',
    'This is gold. We also recommend checking the quiet zone — at least 4 modules of blank background space around the perimeter. Many designers wrap tight borders around the QR and it fails on older phone cameras.',
    18,
    false
),
(
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'Liam O''Connor',
    'Operations Lead',
    'Can confirm! We printed 2,500 event flyers using QRLoop vector SVG and every single scan connected flawlessly under outdoor venue lighting.',
    12,
    false
),
(
    'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    'Devon Miller',
    'UI Designer',
    'Great explanation. The grayscale conversion tip is something even seasoned graphic artists overlook. QRLoop color picker default dark navy (#0F172A) has saved us many times.',
    15,
    false
);


