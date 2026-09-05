const API_BASE = '/api';

export const authStorage = {
  getToken: () => localStorage.getItem('qrloop_token'),
  setToken: (token) => localStorage.setItem('qrloop_token', token),
  clearToken: () => {
    localStorage.removeItem('qrloop_token');
    localStorage.removeItem('qrloop_user');
  },
  getUser: () => {
    const u = localStorage.getItem('qrloop_user');
    return u ? JSON.parse(u) : null;
  },
  setUser: (user) => localStorage.setItem('qrloop_user', JSON.stringify(user)),
};

async function request(endpoint, options = {}) {
  const token = authStorage.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error || data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Auth
  register: async (name, email, password) => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (res.token) authStorage.setToken(res.token);
    if (res.user) authStorage.setUser(res.user);
    return res;
  },

  login: async (email, password) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) authStorage.setToken(res.token);
    if (res.user) authStorage.setUser(res.user);
    return res;
  },

  getMe: async () => {
    const res = await request('/auth/me');
    if (res.user) authStorage.setUser(res.user);
    return res.user;
  },

  logout: () => {
    authStorage.clearToken();
  },

  // QR Code Operations
  createQR: async (qrData) => {
    return request('/qr', {
      method: 'POST',
      body: JSON.stringify(qrData),
    });
  },

  listUserQRs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/qr${query ? `?${query}` : ''}`);
  },

  getQR: async (id) => {
    return request(`/qr/${id}`);
  },

  updateQR: async (id, updateData) => {
    return request(`/qr/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  },

  duplicateQR: async (id) => {
    return request(`/qr/${id}/duplicate`, {
      method: 'POST',
    });
  },

  deleteQR: async (id) => {
    return request(`/qr/${id}`, {
      method: 'DELETE',
    });
  },

  // Analytics
  getPublicStats: async () => {
    return request('/analytics/public-stats');
  },

  getDashboardOverview: async () => {
    return request('/analytics/overview');
  },

  getQRAnalytics: async (id, period = 'all') => {
    return request(`/analytics/qr/${id}?period=${period}`);
  },

  // Status & Health
  getStatus: async () => {
    return request('/status');
  },
};
