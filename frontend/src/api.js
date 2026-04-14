const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function getToken() {
  try { return JSON.parse(sessionStorage.getItem('admin_user'))?.token } catch { return null }
}

function authHeaders() {
  const token = getToken()
  return token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' }
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, { headers: authHeaders(), ...options })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  // Users
  getUsers:    ()           => request('/api/users'),
  createUser:  (data)       => request('/api/users', { method: 'POST', body: JSON.stringify(data) }),
  updateUser:  (id, data)   => request(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser:  (id)         => request(`/api/users/${id}`, { method: 'DELETE' }),

  // Applications
  getApplications:  ()         => request('/api/applications'),
  createApplication:(data)     => request('/api/applications', { method: 'POST', body: JSON.stringify(data) }),
  updateApplication:(id, data) => request(`/api/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteApplication:(id)       => request(`/api/applications/${id}`, { method: 'DELETE' }),

  // Payments
  getPayments:   ()         => request('/api/payments'),
  createPayment: (data)     => request('/api/payments', { method: 'POST', body: JSON.stringify(data) }),
  updatePayment: (id, data) => request(`/api/payments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Contact
  sendContact: (data) => request('/api/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Stats
  getStats: () => request('/api/stats'),

  // Notifications
  getNotifications:  ()   => request('/api/notifications'),
  markRead:          (id) => request(`/api/notifications/${id}/read`, { method: 'PUT' }),
  markAllRead:       ()   => request('/api/notifications/read-all', { method: 'PUT' }),
  dismissNotification:(id)=> request(`/api/notifications/${id}`, { method: 'DELETE' }),

  // Logs
  getLogs: () => request('/api/logs'),
}
