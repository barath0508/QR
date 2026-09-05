const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirectController');
const { redirectLimiter } = require('../middleware/rateLimiter');

// GET /r/:shortcode
router.get('/:shortcode', redirectLimiter, redirectController.handleRedirect);

module.exports = router;
