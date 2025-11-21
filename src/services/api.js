import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://wig-ecommerce-backend.onrender.com/';

console.log('API URL:', API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false, // No auth required
  timeout: 15000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    
    // Extract error message
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    // Return a more user-friendly error
    return Promise.reject(new Error(message));
  }
);

export default api;