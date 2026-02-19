import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (phone, otp) => api.post('/auth/verify-otp', { phone, otp }),
  logout: () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  }
};

// User management endpoints
export const users = {
  getAll: (params) => api.get('/admin/users', { params }),
  getById: (id) => api.get(`/admin/users/${id}`),
  getByPhone: (phone) => api.get(`/admin/users/phone/${phone}`),
  create: (data) => api.post('/admin/users', data),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
  bulkCreate: (users) => api.post('/admin/users/bulk', { users }),
  getStats: () => api.get('/admin/users/stats/summary')
};

export default api;