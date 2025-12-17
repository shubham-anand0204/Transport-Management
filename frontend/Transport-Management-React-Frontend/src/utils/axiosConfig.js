// Production-ready axios configuration with JWT authentication
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add JWT token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or Redux store)
    const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
        if (tokens?.refresh) {
          // Attempt to refresh token
          const response = await axios.post(`${API_BASE}/token/refresh/`, {
            refresh: tokens.refresh,
          });

          const { access } = response.data;
          const newTokens = { ...tokens, access };
          localStorage.setItem('tokens', JSON.stringify(newTokens));

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('tokens');
        window.location.href = '/operator';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

