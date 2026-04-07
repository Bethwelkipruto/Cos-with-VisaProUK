import { useNavigate } from 'react-router-dom'
import { mockStats, mockActivity, mockAlerts } from '../mockData'

const QUICK_STARTS = [
  { icon: '👤', label: 'Add User',        desc: 'Create a new account',    to: '/admin/users' },
  { icon: '💳', label: 'View Payments',   desc: 'Check transactions',      to: '/admin/payments' },
  { icon: '📝', label: 'Edit Content',    desc: 'Update site pages',       to: '/admin/content' },
  { icon: '📊', label: 'Analytics',       desc: 'View traffic & revenue',  to: '/admin/analytics' },
  { icon: '🔔', label: 'Notifications',   desc: 'Check alerts',            to: '/admin/notifications' },
  { icon: '⚙️', label: 'Settings',        desc: 'Configure system',        to: '/admin/settings' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Welcome back — here's what's happening at Hc-One today.</p>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-icon">👥</div>
          <div className="stat-card-label">Total Users</div>
          <div className="stat-card-value">{mockStats.totalUsers.toLocaleString()}</div>
          <div className="stat-card-sub up">↑ {mockStats.newToday} new today</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-label">Active Users</div>
          <div className="stat-card-value">{mockStats.activeUsers.toLocaleString()}</div>
          <div className="stat-card-sub">{Math.round((mockStats.activeUsers / mockStats.totalUsers) * 100)}% of total</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🆕</div>
          <div className="stat-card-label">New Today</div>
          <div className="stat-card-value">{mockStats.newToday}</div>
          <div className="stat-card-sub up">↑ vs yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">💷</div>
          <div className="stat-card-label">Total Revenue</div>
          <div className="stat-card-value">£{mockStats.revenue.toLocaleString()}</div>
          <div className="stat-card-sub up">↑ 12% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⏳</div>
          <div className="stat-card-label">Pending Payments</div>
          <div className="stat-card-value">{mockStats.pendingPayments}</div>
          <div className="stat-card-sub down">Needs attention</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🚨</div>
          <div className="stat-card-label">Open Alerts</div>
          <div className="stat-card-value">{mockStats.openAlerts}</div>
          <div className="stat-card-sub down">Review required</div>
        </div>
      </div>

      {/* Activity + Alerts */}
      <div className="admin-grid-2" style={{ marginBottom: '24px' }}>
        <div className="admin-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {mockActivity.map(a => (
              <div key={a.id} className="activity-item">
                <div className={`activity-dot activity-dot-${a.type}`} />
                <div className="activity-text">
                  <span className="activity-user">{a.user}</span> — {a.detail}
                </div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3>System Alerts</h3>
          <div className="alert-list">
            {mockAlerts.map(a => (
              <div key={a.id} className={`alert-item alert-item-${a.level}`}>
                <span>{a.level === 'error' ? '🔴' : a.level === 'warning' ? '🟡' : 'ℹ️'}</span>
                <span className="alert-msg">{a.message}</span>
                <span className="alert-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick start */}
      <div className="admin-card">
        <h3>Quick Start</h3>
        <div className="quickstart-grid">
          {QUICK_STARTS.map(q => (
            <div key={q.label} className="quickstart-card" onClick={() => navigate(q.to)}>
              <div className="quickstart-card-icon">{q.icon}</div>
              <div className="quickstart-card-label">{q.label}</div>
              <div className="quickstart-card-desc">{q.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
