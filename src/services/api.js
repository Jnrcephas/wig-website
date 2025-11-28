import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.natishlux.com/';

console.log('API URL:', API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false,
  timeout: 15000
});

// Request interceptor - Add authentication token
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    
    // Check if we're in admin context
    const isAdminRoute = window.location.pathname.includes('admin');
    const tokenKey = isAdminRoute ? 'adminAccessToken' : 'accessToken';
    const token = localStorage.getItem(tokenKey);
    
    // Add token to headers if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added auth token to request');
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('Response error:', error.response || error);
    
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized) and attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Check if we're in admin context
        const isAdminRoute = window.location.pathname.includes('admin');
        const refreshTokenKey = isAdminRoute ? 'adminRefreshToken' : 'refreshToken';
        const accessTokenKey = isAdminRoute ? 'adminAccessToken' : 'accessToken';
        const refreshToken = localStorage.getItem(refreshTokenKey);

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // console.log('Attempting to refresh token...');

        // Try to refresh the token
        const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {
          refreshToken
        });

        const { accessToken } = response.data.data;
        
        // Store new access token
        localStorage.setItem(accessTokenKey, accessToken);
        // console.log('Token refreshed successfully');

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Refresh failed - clear tokens and redirect to login
        const isAdminRoute = window.location.pathname.includes('admin');
        
        if (isAdminRoute) {
          localStorage.removeItem('adminAccessToken');
          localStorage.removeItem('adminRefreshToken');
          localStorage.removeItem('adminUser');
          
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('admin-login')) {
            // console.log('Redirecting to admin login...');
            window.location.href = '/admin-login.html';
          }
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          
          // For customer side, you might want to redirect to a login page if you have one
          // if (!window.location.pathname.includes('login')) {
          //   window.location.href = '/login.html';
          // }
        }

        return Promise.reject(refreshError);
      }
    }
    
    // Extract error message
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    // Return a more user-friendly error
    return Promise.reject(new Error(message));
  }
);

export default api;