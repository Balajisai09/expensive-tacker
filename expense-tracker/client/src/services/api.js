import axios from 'axios'

const API_URL = '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Transactions API
export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (data) => api.post('/transactions', data),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
  getByCategory: (category) => api.get(`/transactions/category/${category}`),
  getByDateRange: (startDate, endDate) => 
    api.get('/transactions/range', { params: { startDate, endDate } }),
}

// Budget API
export const budgetAPI = {
  getAll: () => api.get('/budgets'),
  getById: (id) => api.get(`/budgets/${id}`),
  create: (data) => api.post('/budgets', data),
  update: (id, data) => api.put(`/budgets/${id}`, data),
  delete: (id) => api.delete(`/budgets/${id}`),
}

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  delete: (id) => api.delete(`/categories/${id}`),
}

// Reports API
export const reportsAPI = {
  getSummary: (period) => api.get('/reports/summary', { params: { period } }),
  getCategoryBreakdown: () => api.get('/reports/category-breakdown'),
  getMonthlyTrend: () => api.get('/reports/monthly-trend'),
  getExpenseVsIncome: () => api.get('/reports/expense-vs-income'),
}

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

export default api
