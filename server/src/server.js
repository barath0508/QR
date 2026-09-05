const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const qrRoutes = require('./routes/qrRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const { generalLimiter } = require('./middleware/rateLimiter');
const dbAdapter = require('./db/dbAdapter');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for IP lookup when behind proxies
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply general rate limiter
app.use('/api/', generalLimiter);

// 1. Core Dynamic Redirect Route (Top-level /r/:shortcode)
app.use('/r', redirectRoutes);

// 2. API Routes - mounted with both /api and direct prefix for Vercel serverless rewrite compatibility
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/qr', qrRoutes);
app.use('/qr', qrRoutes);

app.use('/api/analytics', analyticsRoutes);
app.use('/analytics', analyticsRoutes);

// 3. Health & Status
const handleStatus = (req, res) => {
  const mode = dbAdapter.getMode();
  res.json({
    service: 'QRLoop API',
    status: 'ok',
    databaseMode: mode,
    isSupabase: mode === 'supabase',
    supabaseConfigured: mode === 'supabase',
    baseUrl: process.env.BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`),
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
};

app.get('/health', handleStatus);
app.get('/api/health', handleStatus);
app.get('/api/status', handleStatus);
app.get('/status', handleStatus);

// 4. Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.name || 'Internal server error',
    message: err.message || 'An unexpected error occurred',
  });
});


// Start Server (only when not running inside Vercel serverless environment)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 QRLoop Backend running on port ${PORT}`);
    console.log(`🔗 Dynamic Redirect engine live at: http://localhost:${PORT}/r/:shortcode`);
    console.log(`📦 Database mode: ${dbAdapter.getMode().toUpperCase()}`);
  });
}

module.exports = app;
