// ============================================================
// WALLET DASHBOARD — Vercel Serverless API
// Handles: /api/ads, /api/wallet-summary, /api/wallet-history,
// /api/update-cell, /api/add-row, /api/delete-row/:id,
// /api/admin-auth
// ============================================================

const { createClient } = require('@supabase/supabase-js');

// ---------- ENV ----------
const SUPABASE_URL        = process.env.SUPABASE_URL;
const SUPABASE_KEY        = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASSWORD      = process.env.ADMIN_PASSWORD || '036324';

const supabase = createClient(SUPABASE_URL || '', SUPABASE_KEY || '', {
  auth: { persistSession: false },
});

// ---------- HELPERS ----------
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function json(res, code, payload) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => (data += c));
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

const ALLOWED_COLS = new Set([
  'channel_name','telegram_link','logo_url','address',
  'ads1','ads1_fees','ads1_duration','ads1_posts',
  'ads2','ads2_fees','ads2_duration','ads2_posts',
  'ads3','ads3_fees','ads3_duration','ads3_posts',
  'ads4','ads4_fees','ads4_duration','ads4_posts',
  'payment_method',
]);

// ============================================================
//                       MAIN HANDLER
// ============================================================
module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace(/\/+$/, '') || '/';

  try {
    // ---------- ADS LIST ----------
    if (path === '/api/ads' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('ads_management').select('*').order('id', { ascending: true });
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, data || []);
    }

    // ---------- WALLET SUMMARY ----------
    if (path === '/api/wallet-summary' && req.method === 'GET') {
      const { data, error } = await supabase.from('ads_management').select('ads1_fees, ads2_fees, ads3_fees, ads4_fees');
      if (error) return json(res, 500, { error: error.message });
      const total = (data || []).reduce((a, r) =>
        a + Number(r.ads1_fees || 0) + Number(r.ads2_fees || 0) + Number(r.ads3_fees || 0) + Number(r.ads4_fees || 0), 0);
      return json(res, 200, { total, count: data?.length || 0 });
    }

    // ---------- WALLET HISTORY ----------
    if (path === '/api/wallet-history' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('ads_management')
        .select('id, channel_name, ads1, ads1_fees, ads2, ads2_fees, ads3, ads3_fees, ads4, ads4_fees, updated_at')
        .order('updated_at', { ascending: false });
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, data || []);
    }

    // ---------- UPDATE CELL ----------
    if (path === '/api/update-cell' && req.method === 'POST') {
      const { id, column, value } = await readJson(req);
      if (!id || !column) return json(res, 400, { error: 'id and column required' });
      if (!ALLOWED_COLS.has(column)) return json(res, 400, { error: 'Column not allowed' });

      const patch = { [column]: value, updated_at: new Date().toISOString() };
      const { data, error } = await supabase
        .from('ads_management').update(patch).eq('id', id).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true, row: data });
    }

    // ---------- ADD ROW ----------
    if (path === '/api/add-row' && req.method === 'POST') {
      const { data, error } = await supabase
        .from('ads_management').insert({ channel_name: 'New Channel' }).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, data);
    }

    // ---------- DELETE ROW ----------
    if (path.startsWith('/api/delete-row/') && req.method === 'DELETE') {
      const id = path.replace('/api/delete-row/', '');
      const { error } = await supabase.from('ads_management').delete().eq('id', id);
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true });
    }

    // ---------- ADMIN AUTH ----------
    if (path === '/api/admin-auth' && req.method === 'POST') {
      const { password } = await readJson(req);
      if (password === ADMIN_PASSWORD) return json(res, 200, { ok: true });
      return json(res, 401, { ok: false });
    }

    return json(res, 404, { error: 'Not found', path });
  } catch (e) {
    console.error('Handler error:', e);
    return json(res, 500, { error: e.message });
  }
};

// Disable Vercel's default body parser for multipart uploads
module.exports.config = {
  api: { bodyParser: false },
};
