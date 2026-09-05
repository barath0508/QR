module.exports = (req, res) => {
  res.status(200).json({
    status: 'pong',
    nodeVersion: process.version,
    env: {
      hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
      hasSupabaseAnonKey: Boolean(process.env.SUPABASE_ANON_KEY),
      hasSupabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasJwtSecret: Boolean(process.env.JWT_SECRET),
      isVercel: Boolean(process.env.VERCEL),
    },
    url: req.url,
    headers: req.headers,
    timestamp: new Date().toISOString(),
  });
};
