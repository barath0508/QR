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

