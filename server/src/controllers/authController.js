const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbAdapter = require('../db/dbAdapter');
const { JWT_SECRET } = require('../middleware/auth');

const authController = {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      const existing = await dbAdapter.getUserByEmail(email);
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      const user = await dbAdapter.createUser({
        email,
        password_hash,
        name: name || email.split('@')[0],
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.status(201).json({
        message: 'Account created successfully',
        user: { id: user.id, email: user.email, name: user.name, plan_tier: user.plan_tier },
        token,
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ 
        error: err.message || 'Internal server error during registration',
        details: err.details || undefined,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await dbAdapter.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.json({
        message: 'Login successful',
        user: { id: user.id, email: user.email, name: user.name, plan_tier: user.plan_tier },
        token,
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: err.message || 'Internal server error during login' });
    }
  },

  async getMe(req, res) {
    try {
      const user = await dbAdapter.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user });
    } catch (err) {
      console.error('Get profile error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  },
};

module.exports = authController;
