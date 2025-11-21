import api from './api';

// Categories
export const categoryAPI = {
  getAll: () => api.get('/api/categories/'),
  getById: (id) => api.get(`/api/categories/${id}`)
};

// Products
export const productAPI = {
  getAll: (params) => api.get('/api/products/', { params }),
  getById: (id) => api.get(`/api/products/${id}`),
  getFeatured: (limit) => api.get('/api/products/featured', { params: { limit } }),
  getByCategory: (categoryId, params) => api.get(`/api/products/category/${categoryId}`, { params }),
  search: (query, limit) => api.get('/api/products/search', { params: { q: query, limit } })
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