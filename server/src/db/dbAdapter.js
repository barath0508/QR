const { isSupabaseConfigured, getSupabaseClient } = require('../config/supabase');
const sqliteDb = require('./sqlite');
const { v4: uuidv4 } = require('uuid');

const dbAdapter = {
  getMode() {
    if (isSupabaseConfigured()) return 'supabase';
    if (sqliteDb.isAvailable && sqliteDb.isAvailable()) return 'sqlite';
    return 'unconfigured';
  },

  async getUserByEmail(email) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const row = sqliteDb.prepare('SELECT * FROM users WHERE LOWER(email) = ?').get(email.toLowerCase().trim());
      return row || null;
    }
  },

  async getUserById(id) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, plan_tier, created_at')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const row = sqliteDb.prepare('SELECT id, email, name, plan_tier, created_at FROM users WHERE id = ?').get(id);
      return row || null;
    }
  },

  async createUser({ email, password_hash, name }) {
    const id = uuidv4();
    const cleanEmail = email.toLowerCase().trim();
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('users')
        .insert([{ id, email: cleanEmail, password_hash, name }])
        .select('id, email, name, plan_tier, created_at')
        .single();
      if (error) throw error;
      return data;
    } else {
      sqliteDb.prepare(`
        INSERT INTO users (id, email, password_hash, name)
        VALUES (?, ?, ?, ?)
      `).run(id, cleanEmail, password_hash, name || '');
      return { id, email: cleanEmail, name, plan_tier: 'free', created_at: new Date().toISOString() };
    }
  },

  async getQRByShortCode(short_code) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('short_code', short_code)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const row = sqliteDb.prepare('SELECT * FROM qr_codes WHERE short_code = ? AND is_active = 1').get(short_code);
      if (row && typeof row.style_config === 'string') {
        try { row.style_config = JSON.parse(row.style_config); } catch (e) {}
      }
      return row || null;
    }
  },

  async getQRById(id, user_id = null) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      let query = supabase.from('qr_codes').select('*').eq('id', id);
      if (user_id) query = query.eq('user_id', user_id);
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data;
    } else {
      let query = 'SELECT * FROM qr_codes WHERE id = ?';
      const params = [id];
      if (user_id) {
        query += ' AND user_id = ?';
        params.push(user_id);
      }
      const row = sqliteDb.prepare(query).get(...params);
      if (row && typeof row.style_config === 'string') {
        try { row.style_config = JSON.parse(row.style_config); } catch (e) {}
      }
      return row || null;
    }
  },

  async getUserQRs(user_id) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      const rows = sqliteDb.prepare('SELECT * FROM qr_codes WHERE user_id = ? ORDER BY created_at DESC').all(user_id);
      return rows.map(r => {
        if (typeof r.style_config === 'string') {
          try { r.style_config = JSON.parse(r.style_config); } catch (e) {}
        }
        return r;
      });
    }
  },

  async createQR({ user_id, short_code, title, qr_type, destination_url, raw_data, is_dynamic, style_config }) {
    const id = uuidv4();
    const styleStr = typeof style_config === 'object' ? JSON.stringify(style_config) : (style_config || '{}');
    const dynamicFlag = is_dynamic !== false ? (isSupabaseConfigured() ? true : 1) : (isSupabaseConfigured() ? false : 0);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('qr_codes')
        .insert([{
          id,
          user_id: user_id || null,
          short_code,
          title: title || 'Untitled Dynamic QR',
          qr_type: qr_type || 'url',
          destination_url,
          raw_data: raw_data || null,
          is_dynamic: is_dynamic !== false,
          style_config: typeof style_config === 'object' ? style_config : JSON.parse(styleStr),
        }])
        .select('*')
        .single();
      if (error) throw error;
      return data;
    } else {
      sqliteDb.prepare(`
        INSERT INTO qr_codes (id, user_id, short_code, title, qr_type, destination_url, raw_data, is_dynamic, style_config)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        user_id || null,
        short_code,
        title || 'Untitled Dynamic QR',
        qr_type || 'url',
        destination_url,
        raw_data || null,
        dynamicFlag,
        styleStr
      );
      return this.getQRById(id);
    }
  },

  async updateQR(id, user_id, { title, destination_url, raw_data, style_config, is_active }) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const updatePayload = { updated_at: new Date().toISOString() };
      if (title !== undefined) updatePayload.title = title;
      if (destination_url !== undefined) updatePayload.destination_url = destination_url;
      if (raw_data !== undefined) updatePayload.raw_data = raw_data;
      if (style_config !== undefined) updatePayload.style_config = style_config;
      if (is_active !== undefined) updatePayload.is_active = is_active;

      let query = supabase.from('qr_codes').update(updatePayload).eq('id', id);
      if (user_id) query = query.eq('user_id', user_id);
      const { data, error } = await query.select('*').single();
      if (error) throw error;
      return data;
    } else {
      const existing = this.getQRById(id, user_id);
      if (!existing) return null;

      const newTitle = title !== undefined ? title : existing.title;
      const newDest = destination_url !== undefined ? destination_url : existing.destination_url;
      const newRaw = raw_data !== undefined ? raw_data : existing.raw_data;
      const newStyle = style_config !== undefined ? (typeof style_config === 'object' ? JSON.stringify(style_config) : style_config) : JSON.stringify(existing.style_config);
      const newActive = is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active;

      sqliteDb.prepare(`
        UPDATE qr_codes
        SET title = ?, destination_url = ?, raw_data = ?, style_config = ?, is_active = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(newTitle, newDest, newRaw, newStyle, newActive, id);

      return this.getQRById(id);
    }
  },

  async deleteQR(id, user_id) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      let query = supabase.from('qr_codes').delete().eq('id', id);
      if (user_id) query = query.eq('user_id', user_id);
      const { error } = await query;
      if (error) throw error;
      return true;
    } else {
      let query = 'DELETE FROM qr_codes WHERE id = ?';
      const params = [id];
      if (user_id) {
        query += ' AND user_id = ?';
        params.push(user_id);
      }
      sqliteDb.prepare(query).run(...params);
      return true;
    }
  },

  async logScan({ qr_id, short_code, ip_address, user_agent, device_type, os, browser, country, city, region, referer }) {
    const id = uuidv4();
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      // Insert log
      await supabase.from('scan_logs').insert([{
        id,
        qr_id,
        short_code,
        ip_address,
        user_agent,
        device_type: device_type || 'desktop',
        os: os || 'Unknown OS',
        browser: browser || 'Unknown Browser',
        country: country || 'Unknown Country',
        city: city || 'Unknown City',
        region: region || 'Unknown Region',
        referer: referer || 'Direct',
      }]);
      // Increment total_scans via RPC or direct increment
      const { data: current } = await supabase.from('qr_codes').select('total_scans').eq('id', qr_id).single();
      if (current) {
        await supabase.from('qr_codes').update({ total_scans: (current.total_scans || 0) + 1 }).eq('id', qr_id);
      }
    } else {
      sqliteDb.prepare(`
        INSERT INTO scan_logs (id, qr_id, short_code, ip_address, user_agent, device_type, os, browser, country, city, region, referer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        qr_id,
        short_code,
        ip_address || '',
        user_agent || '',
        device_type || 'desktop',
        os || 'Unknown OS',
        browser || 'Unknown Browser',
        country || 'Unknown Country',
        city || 'Unknown City',
        region || 'Unknown Region',
        referer || 'Direct'
      );

      sqliteDb.prepare('UPDATE qr_codes SET total_scans = total_scans + 1, updated_at = datetime(\'now\') WHERE id = ?').run(qr_id);
    }
  },

  async getQRAnalytics(qr_id) {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data: logs, error } = await supabase
        .from('scan_logs')
        .select('*')
        .eq('qr_id', qr_id)
        .order('scanned_at', { ascending: false })
        .limit(1000);
      if (error) throw error;
      return this._computeAnalyticsMetrics(logs || []);
    } else {
      const logs = sqliteDb.prepare('SELECT * FROM scan_logs WHERE qr_id = ? ORDER BY scanned_at DESC LIMIT 1000').all(qr_id);
      return this._computeAnalyticsMetrics(logs);
    }
  },

  _computeAnalyticsMetrics(logs) {
    const totalScans = logs.length;
    const uniqueIps = new Set(logs.map(l => l.ip_address).filter(Boolean)).size;

    // Device breakdown
    const devices = {};
    const browsers = {};
    const osMap = {};
    const countries = {};
    const cities = {};
    const scansByDate = {};

    logs.forEach(log => {
      // Device
      const dev = (log.device_type || 'desktop').toLowerCase();
      devices[dev] = (devices[dev] || 0) + 1;

      // Browser
      const br = log.browser || 'Unknown';
      browsers[br] = (browsers[br] || 0) + 1;

      // OS
      const os = log.os || 'Unknown';
      osMap[os] = (osMap[os] || 0) + 1;

      // Country
      const c = log.country || 'Unknown';
      countries[c] = (countries[c] || 0) + 1;

      // City
      const ct = log.city ? `${log.city}, ${c}` : c;
      cities[ct] = (cities[ct] || 0) + 1;

      // Scans by date (YYYY-MM-DD)
      const dateStr = (log.scanned_at || '').substring(0, 10);
      if (dateStr) {
        scansByDate[dateStr] = (scansByDate[dateStr] || 0) + 1;
      }
    });

    // Format scans over time as sorted array
    const scansOverTime = Object.keys(scansByDate).sort().map(date => ({
      date,
      scans: scansByDate[date],
    }));

    // Top arrays
    const topDevices = Object.entries(devices).map(([name, count]) => ({ name, count }));
    const topBrowsers = Object.entries(browsers).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6);
    const topOs = Object.entries(osMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6);
    const topCountries = Object.entries(countries).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8);
    const topCities = Object.entries(cities).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8);

    return {
      totalScans,
      uniqueVisitors: uniqueIps || totalScans,
      scansOverTime,
      deviceBreakdown: topDevices,
      browserBreakdown: topBrowsers,
      osBreakdown: topOs,
      countryBreakdown: topCountries,
      cityBreakdown: topCities,
      recentScans: logs.slice(0, 50),
    };
  },

  async getGlobalStats() {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { count: qrCount } = await supabase.from('qr_codes').select('*', { count: 'exact', head: true });
      const { count: scanCount } = await supabase.from('scan_logs').select('*', { count: 'exact', head: true });
      const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
      return {
        totalQRs: qrCount || 0,
        totalScans: scanCount || 0,
        totalUsers: userCount || 0,
      };
    } else {
      const qrs = sqliteDb.prepare('SELECT COUNT(*) as count FROM qr_codes').get()?.count || 0;
      const scans = sqliteDb.prepare('SELECT COUNT(*) as count FROM scan_logs').get()?.count || 0;
      const users = sqliteDb.prepare('SELECT COUNT(*) as count FROM users').get()?.count || 0;
      return {
        totalQRs: qrs,
        totalScans: scans,
        totalUsers: users,
      };
    }
  }
};

module.exports = dbAdapter;
