const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const qrGenerateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 QR generations per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Generation rate limit reached. Please slow down.' },
});

const redirectLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200, // 200 redirects per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  qrGenerateLimiter,
  redirectLimiter,
};
