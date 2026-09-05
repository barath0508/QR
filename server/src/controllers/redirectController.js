const dbAdapter = require('../db/dbAdapter');
const { getClientIp, maskIp, resolveLocationFromReq } = require('../utils/geoLookup');
const { parseUserAgent } = require('../utils/deviceParser');

const redirectController = {
  async handleRedirect(req, res) {
    const { shortcode } = req.params;

    if (!shortcode) {
      return res.status(404).send('Shortcode is required');
    }

    try {
      const qr = await dbAdapter.getQRByShortCode(shortcode);

      if (!qr || qr.is_active === 0 || qr.is_active === false) {
        return res.status(404).send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>QR Code Inactive | QRLoop</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #0B0F19;
                color: #F8FAFC;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
              }
              .card {
                background: #1E293B;
                border: 1px solid #334155;
                border-radius: 16px;
                padding: 40px 32px;
                max-width: 460px;
                text-align: center;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
              }
              .badge {
                display: inline-block;
                background: rgba(239, 68, 68, 0.15);
                color: #EF4444;
                padding: 6px 14px;
                border-radius: 9999px;
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 20px;
              }
              h1 { font-size: 24px; margin: 0 0 12px; font-weight: 700; }
              p { color: #94A3B8; font-size: 15px; line-height: 1.6; margin: 0 0 24px; }
              .btn {
                display: inline-block;
                background: #10B981;
                color: #0F172A;
                font-weight: 600;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                transition: background 0.2s;
              }
              .btn:hover { background: #059669; }
            </style>
          </head>
          <body>
            <div class="card">
              <span class="badge">Link Inactive or Paused</span>
              <h1>Dynamic QR Code Not Found</h1>
              <p>The dynamic QR code with link <strong>/r/${shortcode}</strong> has either been paused by its owner or does not exist.</p>
              <a href="/" class="btn">Create Your Own Dynamic QR Code</a>
            </div>
          </body>
          </html>
        `);
      }

      // Extract telemetry information
      const rawIp = getClientIp(req);
      const maskedIp = maskIp(rawIp);
      const userAgent = req.headers['user-agent'] || '';
      const referer = req.headers['referer'] || req.headers['referrer'] || 'Direct';

      const { device_type, os, browser } = parseUserAgent(userAgent);
      const { country, city, region } = resolveLocationFromReq(req);

      // Await the scan logging so Vercel Serverless does not freeze before write completes
      try {
        await dbAdapter.logScan({
          qr_id: qr.id,
          short_code: qr.short_code,
          ip_address: maskedIp,
          user_agent: userAgent.substring(0, 500),
          device_type,
          os,
          browser,
          country,
          city,
          region,
          referer: referer.substring(0, 300),
        });
      } catch (logErr) {
        console.error('Failed to log scan telemetry:', logErr);
      }

      // Prepare target destination URL
      let destination = qr.destination_url.trim();
      if (!destination.startsWith('http://') && !destination.startsWith('https://') && !destination.startsWith('mailto:') && !destination.startsWith('tel:')) {
        destination = 'https://' + destination;
      }

      // Issue HTTP 302 redirect
      res.redirect(302, destination);
    } catch (err) {
      console.error('Error during dynamic redirect:', err);
      res.status(500).send('Redirect error occurred');
    }
  }
};

module.exports = redirectController;
