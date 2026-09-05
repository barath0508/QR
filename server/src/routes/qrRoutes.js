const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { qrGenerateLimiter } = require('../middleware/rateLimiter');

// Create QR (guest or logged-in)
router.post('/', qrGenerateLimiter, optionalAuth, qrController.createQR);

// User's QR codes (requires auth)
router.get('/', requireAuth, qrController.listUserQRs);

// Get single QR details
router.get('/:id', optionalAuth, qrController.getQR);

// Update destination or details (requires auth)
router.patch('/:id', requireAuth, qrController.updateQR);
router.put('/:id', requireAuth, qrController.updateQR);

// Duplicate a QR (requires auth)
router.post('/:id/duplicate', requireAuth, qrController.duplicateQR);

// Delete QR (requires auth)
router.delete('/:id', requireAuth, qrController.deleteQR);

// Render server image fallback
router.get('/render/image', qrController.renderServerImage);

module.exports = router;
