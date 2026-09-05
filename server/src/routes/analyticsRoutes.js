const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// Public system stats (landing page counters)
router.get('/public-stats', analyticsController.getPublicStats);

// User dashboard overview
router.get('/overview', requireAuth, analyticsController.getDashboardOverview);

// Individual QR code analytics
router.get('/qr/:id', optionalAuth, analyticsController.getQRAnalytics);

module.exports = router;
