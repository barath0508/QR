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

// 2. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/analytics', analyticsRoutes);

// 3. Health & Status
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    databaseMode: dbAdapter.getMode(),
  });
});

app.get('/api/status', (req, res) => {
  const mode = dbAdapter.getMode();
  res.json({
    service: 'QRLoop API',
    databaseMode: mode,
    isSupabase: mode === 'supabase',
    baseUrl: process.env.BASE_URL || `http://localhost:${PORT}`,
    version: '1.0.0',
  });
});

// 4. Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
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
