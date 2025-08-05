import axios from 'axios';

const BASE_URL = 'https://bj-hotel-api.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to attach token from localStorage (if available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Utility to manually set token in headers (if needed)
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Optional: Utility to clear token
export const clearAuthToken = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

export default api;
