export const mockStats = {
  totalUsers: 1284,
  activeUsers: 943,
  newToday: 17,
  revenue: 48320,
  pendingPayments: 8,
  openAlerts: 3,
}

export const mockUsers = [
  { id: 1,  name: 'Amara Mensah',     email: 'amara@example.com',   role: 'Admin',  status: 'Active',    joined: '2025-01-03', lastLogin: '2025-04-10' },
  { id: 2,  name: 'Chidi Okonkwo',    email: 'chidi@example.com',   role: 'Editor', status: 'Active',    joined: '2025-01-15', lastLogin: '2025-04-09' },
  { id: 3,  name: 'Sunita Rao',       email: 'sunita@example.com',  role: 'Viewer', status: 'Suspended', joined: '2025-02-01', lastLogin: '2025-03-20' },
  { id: 4,  name: 'James Whitfield',  email: 'james@example.com',   role: 'Editor', status: 'Active',    joined: '2025-02-14', lastLogin: '2025-04-08' },
  { id: 5,  name: 'Fatima Al-Hassan', email: 'fatima@example.com',  role: 'Viewer', status: 'Active',    joined: '2025-03-05', lastLogin: '2025-04-07' },
  { id: 6,  name: 'Liam Brennan',     email: 'liam@example.com',    role: 'Viewer', status: 'Active',    joined: '2025-03-18', lastLogin: '2025-04-06' },
  { id: 7,  name: 'Priya Sharma',     email: 'priya@example.com',   role: 'Editor', status: 'Suspended', joined: '2025-03-22', lastLogin: '2025-03-30' },
  { id: 8,  name: 'David Kimani',     email: 'david@example.com',   role: 'Viewer', status: 'Active',    joined: '2025-04-01', lastLogin: '2025-04-10' },
]

export const mockTransactions = [
  { id: 'TXN-001', user: 'Amara Mensah',     service: 'Skilled Worker Visa',    amount: 1500, status: 'Paid',    date: '2025-04-10' },
  { id: 'TXN-002', user: 'Chidi Okonkwo',    service: 'CoS Assignment',         amount: 627,  status: 'Paid',    date: '2025-04-09' },
  { id: 'TXN-003', user: 'Sunita Rao',       service: 'Sponsor Licence',        amount: 1476, status: 'Pending', date: '2025-04-08' },
  { id: 'TXN-004', user: 'James Whitfield',  service: 'IHS Surcharge (5yr)',    amount: 5175, status: 'Paid',    date: '2025-04-07' },
  { id: 'TXN-005', user: 'Fatima Al-Hassan', service: 'Priority Service',       amount: 500,  status: 'Failed',  date: '2025-04-06' },
  { id: 'TXN-006', user: 'Liam Brennan',     service: 'Visa Extension',         amount: 985,  status: 'Pending', date: '2025-04-05' },
  { id: 'TXN-007', user: 'Priya Sharma',     service: 'Compliance Audit',       amount: 750,  status: 'Paid',    date: '2025-04-04' },
  { id: 'TXN-008', user: 'David Kimani',     service: 'Super-Priority Service', amount: 1000, status: 'Refunded',date: '2025-04-03' },
]

export const mockActivity = [
  { id: 1, type: 'login',  user: 'Amara Mensah',    detail: 'Logged in',                    time: '2 min ago' },
  { id: 2, type: 'update', user: 'Chidi Okonkwo',   detail: 'Updated Services page content', time: '18 min ago' },
  { id: 3, type: 'create', user: 'Admin',            detail: 'Created user David Kimani',    time: '1 hr ago' },
  { id: 4, type: 'payment',user: 'James Whitfield',  detail: 'Payment TXN-004 confirmed',    time: '3 hr ago' },
  { id: 5, type: 'alert',  user: 'System',           detail: 'Email service latency detected',time: '5 hr ago' },
  { id: 6, type: 'suspend',user: 'Admin',            detail: 'Suspended account: Priya Sharma','time': '1 day ago' },
]

export const mockAlerts = [
  { id: 1, level: 'error',   message: 'Email delivery failure — Resend API timeout',     time: '5 hr ago' },
  { id: 2, level: 'warning', message: 'Payment gateway response slow (>3s avg)',          time: '1 day ago' },
  { id: 3, level: 'info',    message: 'Scheduled maintenance window: Sun 04:00–05:00 UTC', time: '2 days ago' },
]

export const mockNotifications = [
  { id: 1, read: false, message: 'New user registered: David Kimani',         time: '1 hr ago' },
  { id: 2, read: false, message: 'Payment TXN-005 failed — action required',  time: '3 hr ago' },
  { id: 3, read: true,  message: 'Priya Sharma account suspended',            time: '1 day ago' },
  { id: 4, read: true,  message: 'System backup completed successfully',       time: '2 days ago' },
]

export const mockLogs = [
  { id: 1, level: 'INFO',  source: 'Auth',     message: 'User amara@example.com logged in',          time: '2025-04-10 08:02' },
  { id: 2, level: 'INFO',  source: 'Content',  message: 'Services page updated by chidi@example.com', time: '2025-04-10 07:44' },
  { id: 3, level: 'ERROR', source: 'Email',    message: 'Resend API timeout after 30s',               time: '2025-04-09 22:11' },
  { id: 4, level: 'WARN',  source: 'Payment',  message: 'Stripe webhook retry #2 for TXN-005',        time: '2025-04-09 18:30' },
  { id: 5, level: 'INFO',  source: 'Auth',     message: 'Password reset requested: sunita@example.com',time: '2025-04-09 14:05' },
  { id: 6, level: 'INFO',  source: 'Admin',    message: 'User david@example.com created by admin',    time: '2025-04-09 11:00' },
]

export const mockAnalytics = {
  months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  revenue: [3200, 5100, 7400, 6800, 9200, 11500],
  users:   [40,   85,   130,  110,  160,  210],
}

export const mockIntegrations = [
  { id: 1, name: 'Stripe',       category: 'Payments',      status: 'Connected',    icon: '💳' },
  { id: 2, name: 'Resend',       category: 'Email',         status: 'Connected',    icon: '📧' },
  { id: 3, name: 'Supabase',     category: 'Database',      status: 'Connected',    icon: '🗄️' },
  { id: 4, name: 'Cloudinary',   category: 'Media',         status: 'Disconnected', icon: '🖼️' },
  { id: 5, name: 'Google OAuth', category: 'Auth',          status: 'Disconnected', icon: '🔐' },
  { id: 6, name: 'Twilio',       category: 'SMS',           status: 'Disconnected', icon: '📱' },
]
