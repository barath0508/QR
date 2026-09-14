const path = require('path');
const fs = require('fs');
const os = require('os');

let db = null;
let Database = null;

try {
  Database = require('better-sqlite3');
} catch (err) {
  // better-sqlite3 not installed or native binary unsupported in serverless
  console.warn('ℹ️ better-sqlite3 not available in this environment. Local SQLite disabled.');
}

if (Database) {
  try {
    const isVercel = Boolean(process.env.VERCEL);
    const dbPath = isVercel
      ? path.resolve(os.tmpdir(), 'qrloop.db')
      : path.resolve(__dirname, '../../../qrloop.db');


    db = new Database(dbPath);

    // Enable WAL mode for high concurrency (if not in /tmp or read-only)
    try {
      db.pragma('journal_mode = WAL');
    } catch (e) {
      // WAL pragma might fail in some environments
    }

    // Initialize tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        plan_tier TEXT DEFAULT 'free',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS qr_codes (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        short_code TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL DEFAULT 'Untitled Dynamic QR',
        qr_type TEXT NOT NULL DEFAULT 'url',
        destination_url TEXT NOT NULL,
        raw_data TEXT,
        is_dynamic INTEGER DEFAULT 1,
        style_config TEXT,
        total_scans INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS scan_logs (
        id TEXT PRIMARY KEY,
        qr_id TEXT REFERENCES qr_codes(id) ON DELETE CASCADE,
        short_code TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        device_type TEXT DEFAULT 'desktop',
        os TEXT DEFAULT 'Unknown OS',
        browser TEXT DEFAULT 'Unknown Browser',
        country TEXT DEFAULT 'Unknown Country',
        city TEXT DEFAULT 'Unknown City',
        region TEXT DEFAULT 'Unknown Region',
        referer TEXT DEFAULT 'Direct',
        scanned_at TEXT DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS idx_qr_codes_short_code ON qr_codes(short_code);
      CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);
      CREATE INDEX IF NOT EXISTS idx_scan_logs_qr_id ON scan_logs(qr_id);
      CREATE INDEX IF NOT EXISTS idx_scan_logs_short_code ON scan_logs(short_code);
      CREATE INDEX IF NOT EXISTS idx_scan_logs_scanned_at ON scan_logs(scanned_at DESC);

      CREATE TABLE IF NOT EXISTS community_topics (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        category_label TEXT NOT NULL,
        author TEXT NOT NULL,
        role TEXT DEFAULT 'Community Member',
        content TEXT NOT NULL,
        tags TEXT DEFAULT '[]',
        upvotes INTEGER DEFAULT 0,
        is_pinned INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS community_replies (
        id TEXT PRIMARY KEY,
        topic_id TEXT REFERENCES community_topics(id) ON DELETE CASCADE,
        author TEXT NOT NULL,
        role TEXT DEFAULT 'Community Member',
        text TEXT NOT NULL,
        upvotes INTEGER DEFAULT 0,
        is_verified INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS idx_community_topics_category ON community_topics(category);
      CREATE INDEX IF NOT EXISTS idx_community_topics_created_at ON community_topics(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_community_replies_topic_id ON community_replies(topic_id);
    `);

    // Seed default demo dynamic QR if not exists
    const existing = db.prepare('SELECT id FROM qr_codes WHERE short_code = ?').get('welcome');
    if (!existing) {
      const { v4: uuidv4 } = require('uuid');
      db.prepare(`
        INSERT INTO qr_codes (id, short_code, title, qr_type, destination_url, is_dynamic, style_config)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        uuidv4(),
        'welcome',
        'Welcome to QRLoop',
        'url',
        'https://github.com',
        1,
        JSON.stringify({
          fgColor: '#0F172A',
          bgColor: '#FFFFFF',
          dotStyle: 'rounded',
          eyeStyle: 'rounded',
          errorCorrection: 'M',
          logo: null,
          logoSize: 20
        })
      );
    }

    // Seed initial community discussions if empty
    const topicCount = db.prepare('SELECT COUNT(*) as count FROM community_topics').get();
    if (topicCount && topicCount.count === 0) {
      const seedTopics = [
        {
          id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
          title: 'How to test your QR code before printing 10,000 flyers (The 10:1 distance rule)',
          category: 'print-design',
          category_label: 'Print & Design',
          author: 'Marcus Vance',
          role: 'Hospitality Director • Chicago',
          content: 'Before sending any design file to an offset or digital printer, always calculate the maximum viewing distance.\n\nThe golden formula is the 10:1 distance-to-size ratio:\n• A tabletop standee viewed from 12 inches away requires at least a 1.2-inch (30mm) QR code.\n• A wall poster scanned from 5 feet (60 inches) away requires a 6-inch (150mm) QR code.\n• A storefront window banner viewed from 15 feet away needs a 1.5-foot (450mm) QR code.\n\nAlso always export as lossless vector SVG from QRLoop rather than PNG. Raster images get blurry at large scale, whereas SVG curves remain infinitely sharp for laser cutters and high-DPI plates.',
          tags: JSON.stringify(['printing', 'svg', 'dimensions', 'menus']),
          upvotes: 54,
          is_pinned: 1,
          replies: [
            {
              id: 'rep-1',
              author: 'Elena Rostova',
              role: 'Brand Designer',
              text: 'This is gold. We also recommend checking the quiet zone — at least 4 modules of blank background space around the perimeter. Many designers wrap tight borders around the QR and it fails on older phone cameras.',
              upvotes: 18,
              is_verified: 0
            },
            {
              id: 'rep-2',
              author: 'Liam O\'Connor',
              role: 'Operations Lead',
              text: 'Can confirm! We printed 2,500 event flyers using QRLoop vector SVG and every single scan connected flawlessly under outdoor venue lighting.',
              upvotes: 12,
              is_verified: 0
            }
          ]
        },
        {
          id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
          title: 'Why did my smartphone camera fail to scan white-on-yellow QR codes? (Contrast guidelines)',
          category: 'troubleshooting',
          category_label: 'Troubleshooting',
          author: 'Sarah Chen',
          role: 'Tech Lead • Omnichannel',
          content: 'A client asked us for a "pastel aesthetic" QR code with white dots on a pale lemon-yellow background. When printed, almost 70% of iOS and Android native camera apps could not lock focus or decode the matrix.\n\nHere is why:\nBarcode decoders rely on luminance contrast, not color contrast. Smartphone camera sensors first convert the image to grayscale before running edge detection. Light yellow and white have almost identical grayscale values.\n\nBest practice rule:\n1. Always maintain at least a 4:1 luminance ratio between foreground and background.\n2. Keep the finder eyes (the three corner squares) dark.\n3. If using light branding colors, put them on a dark charcoal or navy background instead.',
          tags: JSON.stringify(['contrast', 'camera-focus', 'accessibility', 'colors']),
          upvotes: 46,
          is_pinned: 0,
          replies: [
            {
              id: 'rep-3',
              author: 'Devon Miller',
              role: 'UI Designer',
              text: 'Great explanation. The grayscale conversion tip is something even seasoned graphic artists overlook. QRLoop color picker default dark navy (#0F172A) has saved us many times.',
              upvotes: 15,
              is_verified: 0
            }
          ]
        }
      ];

      const insertTopic = db.prepare(`
        INSERT INTO community_topics (id, title, category, category_label, author, role, content, tags, upvotes, is_pinned)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const insertReply = db.prepare(`
        INSERT INTO community_replies (id, topic_id, author, role, text, upvotes, is_verified)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      for (const t of seedTopics) {
        insertTopic.run(t.id, t.title, t.category, t.category_label, t.author, t.role, t.content, t.tags, t.upvotes, t.is_pinned);
        for (const r of t.replies) {
          insertReply.run(r.id, t.id, r.author, r.role, r.text, r.upvotes, r.is_verified);
        }
      }
    }
  } catch (err) {
    console.error('⚠️ Failed to initialize SQLite database:', err.message);
    db = null;
  }
}

module.exports = {
  isAvailable: () => Boolean(db),
  prepare: (sql) => {
    if (!db) {
      throw new Error(
        'Database connection unavailable: Supabase is not configured and local SQLite is unavailable. Please configure SUPABASE_URL and SUPABASE_ANON_KEY in your environment variables.'
      );
    }
    return db.prepare(sql);
  },
  exec: (sql) => {
    if (db) db.exec(sql);
  },
  pragma: (str) => {
    if (db) db.pragma(str);
  }
};

