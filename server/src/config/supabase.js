const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Check multiple potential .env paths for local development convenience
const candidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
];
for (const envPath of candidates) {
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
  }
}

const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)?.trim();


let supabaseClient = null;
let isConfigured = false;

if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });
    isConfigured = true;
    console.log('✅ Supabase Client initialized with URL:', supabaseUrl);
  } catch (err) {
    console.warn('⚠️ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('ℹ️ Supabase credentials not provided in .env. Running in SQLite local mode.');
}

module.exports = {
  isSupabaseConfigured: () => isConfigured,
  getSupabaseClient: () => supabaseClient,
};
