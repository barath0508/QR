// Vercel Serverless Function entry point with comprehensive diagnostics
let app = null;
let initError = null;

try {
  app = require('../server/src/server');
} catch (err) {
  console.error('Failed to load server application:', err);
  initError = {
    message: err.message,
    stack: err.stack,
    name: err.name,
  };
}

module.exports = (req, res) => {
  if (initError) {
    return res.status(500).json({
      error: 'Serverless initialization error',
      details: initError.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : initError.stack,
      hint: 'Check server dependencies and environment variables in Vercel settings',
    });
  }

  try {
    return app(req, res);
  } catch (err) {
    console.error('Runtime serverless error:', err);
    return res.status(500).json({
      error: 'Serverless runtime error',
      details: err.message,
    });
  }
};
