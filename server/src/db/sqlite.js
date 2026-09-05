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

