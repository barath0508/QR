const crypto = require('crypto');
const QRCode = require('qrcode');
const dbAdapter = require('../db/dbAdapter');

function generateRandomShortCode(length = 6) {
  const chars = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

const qrController = {
  async createQR(req, res) {
    try {
      const {
        title,
        qr_type = 'url',
        destination_url,
        raw_data,
        is_dynamic = true,
        style_config,
        custom_alias,
      } = req.body;

      if (!destination_url) {
        return res.status(400).json({ error: 'Destination URL / content is required' });
      }

      let short_code = custom_alias ? custom_alias.trim().toLowerCase() : null;

      if (short_code) {
        // Validate custom alias format: alphanumeric and dashes only
        if (!/^[a-z0-9-_]{3,20}$/.test(short_code)) {
          return res.status(400).json({ error: 'Custom alias must be 3-20 alphanumeric characters or hyphens' });
        }
        const existing = await dbAdapter.getQRByShortCode(short_code);
        if (existing) {
          return res.status(400).json({ error: 'This custom alias is already taken. Please pick another one.' });
        }
      } else {
        // Generate random unique code
        let unique = false;
        let attempts = 0;
        while (!unique && attempts < 10) {
          short_code = generateRandomShortCode(6);
          const existing = await dbAdapter.getQRByShortCode(short_code);
          if (!existing) unique = true;
          attempts++;
        }
      }

      const userId = req.user ? req.user.id : null;

      const qr = await dbAdapter.createQR({
        user_id: userId,
        short_code,
        title: title || (is_dynamic ? 'Dynamic QR Code' : 'Static QR Code'),
        qr_type,
        destination_url: destination_url.trim(),
        raw_data: raw_data || null,
        is_dynamic: is_dynamic !== false,
        style_config: style_config || {},
      });

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      const redirect_url = `${baseUrl}/r/${qr.short_code}`;

      res.status(201).json({
        message: 'QR code created successfully',
        qr: {
          ...qr,
          redirect_url,
        }
      });
    } catch (err) {
      console.error('Error creating QR code:', err);
      res.status(500).json({ error: 'Failed to create QR code' });
    }
  },

  async listUserQRs(req, res) {
    try {
      const userId = req.user.id;
      const qrs = await dbAdapter.getUserQRs(userId);

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      const enriched = qrs.map(qr => ({
        ...qr,
        redirect_url: `${baseUrl}/r/${qr.short_code}`,
      }));

      res.json({ qrs: enriched });
    } catch (err) {
      console.error('Error listing user QR codes:', err);
      res.status(500).json({ error: 'Failed to retrieve QR codes' });
    }
  },

  async getQR(req, res) {
    try {
      const { id } = req.params;
      const qr = await dbAdapter.getQRById(id);

      if (!qr) {
        return res.status(404).json({ error: 'QR code not found' });
      }

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      res.json({
        qr: {
          ...qr,
          redirect_url: `${baseUrl}/r/${qr.short_code}`,
        }
      });
    } catch (err) {
      console.error('Error getting QR code:', err);
      res.status(500).json({ error: 'Failed to retrieve QR code' });
    }
  },

  async updateQR(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { title, destination_url, raw_data, style_config, is_active } = req.body;

      const updated = await dbAdapter.updateQR(id, userId, {
        title,
        destination_url,
        raw_data,
        style_config,
        is_active,
      });

      if (!updated) {
        return res.status(404).json({ error: 'QR code not found or unauthorized' });
      }

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      res.json({
        message: 'QR code updated successfully',
        qr: {
          ...updated,
          redirect_url: `${baseUrl}/r/${updated.short_code}`,
        }
      });
    } catch (err) {
      console.error('Error updating QR code:', err);
      res.status(500).json({ error: 'Failed to update QR code' });
    }
  },

  async duplicateQR(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const original = await dbAdapter.getQRById(id, userId);
      if (!original) {
        return res.status(404).json({ error: 'Original QR code not found' });
      }

      let short_code = '';
      let unique = false;
      while (!unique) {
        short_code = generateRandomShortCode(6);
        const existing = await dbAdapter.getQRByShortCode(short_code);
        if (!existing) unique = true;
      }

      const duplicated = await dbAdapter.createQR({
        user_id: userId,
        short_code,
        title: `${original.title} (Copy)`,
        qr_type: original.qr_type,
        destination_url: original.destination_url,
        raw_data: original.raw_data,
        is_dynamic: original.is_dynamic,
        style_config: original.style_config,
      });

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      res.status(201).json({
        message: 'QR code duplicated successfully',
        qr: {
          ...duplicated,
          redirect_url: `${baseUrl}/r/${duplicated.short_code}`,
        }
      });
    } catch (err) {
      console.error('Error duplicating QR code:', err);
      res.status(500).json({ error: 'Failed to duplicate QR code' });
    }
  },

  async deleteQR(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const success = await dbAdapter.deleteQR(id, userId);
      if (!success) {
        return res.status(404).json({ error: 'QR code not found or unauthorized' });
      }

      res.json({ message: 'QR code deleted successfully' });
    } catch (err) {
      console.error('Error deleting QR code:', err);
      res.status(500).json({ error: 'Failed to delete QR code' });
    }
  },

  async renderServerImage(req, res) {
    try {
      const { text, format = 'png', errorCorrection = 'M', color = '#000000', bgColor = '#ffffff' } = req.query;
      if (!text) {
        return res.status(400).send('Text parameter is required');
      }

      if (format === 'svg') {
        const svg = await QRCode.toString(text, {
          type: 'svg',
          errorCorrectionLevel: errorCorrection,
          color: {
            dark: color,
            light: bgColor,
          }
        });
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send(svg);
      }

      const dataUrl = await QRCode.toDataURL(text, {
        errorCorrectionLevel: errorCorrection,
        margin: 2,
        color: {
          dark: color,
          light: bgColor,
        }
      });

      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      res.setHeader('Content-Type', 'image/png');
      res.send(imgBuffer);
    } catch (err) {
      console.error('Error rendering server QR:', err);
      res.status(500).send('QR render error');
    }
  }
};

module.exports = qrController;
