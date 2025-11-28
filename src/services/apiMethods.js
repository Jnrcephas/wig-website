import api from './api';

// Auth
export const authAPI = {
  login: (data) => api.post('/api/auth/login', data),
  register: (data) => api.post('/api/auth/register', data),
  logout: () => api.post('/api/auth/logout'),
  refreshToken: (data) => api.post('/api/auth/refresh-token', data),
  forgotPassword: (data) => api.post('/api/auth/forgot-password', data),
  resetPassword: (data) => api.post('/api/auth/reset-password', data),
  changePassword: (data) => api.post('/api/auth/change-password', data),
  getProfile: () => api.get('/api/auth/profile'),
  createAdmin: (data) => api.post('/api/auth/admin/create', data),
};

// Categories
export const categoryAPI = {
  getAll: () => api.get('/api/categories/'),
  getById: (id) => api.get(`/api/categories/${id}`),
  create: (data) => api.post('/api/categories/', data),
  update: (id, data) => api.put(`/api/categories/${id}`, data),
  delete: (id) => api.delete(`/api/categories/${id}`)
};

// Products
export const productAPI = {
  getAll: (params) => api.get('/api/products/', { params }),
  getById: (id) => api.get(`/api/products/${id}`),
  getFeatured: (limit) => api.get('/api/products/featured', { params: { limit } }),
  getByCategory: (categoryId, params) => api.get(`/api/products/category/${categoryId}`, { params }),
  search: (query, limit) => api.get('/api/products/search', { params: { q: query, limit } }),
  create: (data) => api.post('/api/products/', data),
  update: (id, data) => api.put(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`)
};

// Orders
export const orderAPI = {
  getAll: (params) => api.get('/api/orders/', { params }),
  getById: (id) => api.get(`/api/orders/${id}`),
  getByNumber: (orderNumber) => api.get(`/api/orders/number/${orderNumber}`),
  getStats: () => api.get('/api/orders/stats'),
  updateStatus: (orderNumber, data) => api.patch(`/api/orders/number/${orderNumber}/status`, data),
  updateById: (id, data) => api.patch(`/api/orders/${id}`, data), // Added this method
  update: (id, data) => api.put(`/api/orders/${id}`, data), // Alternative update method
};

// Payments (Stripe Checkout)
export const paymentAPI = {
  createCheckout: (data) => api.post('/api/payments/checkout', data),
  getSession: (sessionId) => api.get(`/api/payments/session/${sessionId}`),
  getOrder: (orderId) => api.get(`/api/payments/order/${orderId}`)
};

// Health check
export const healthAPI = {
  check: () => api.get('/health')
};