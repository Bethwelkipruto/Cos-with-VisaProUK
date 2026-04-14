import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'

const QUICK_STARTS = [
  { icon: '👤', label: 'Add User',      desc: 'Create a new account',   to: '/admin/users' },
  { icon: '💳', label: 'View Payments', desc: 'Check transactions',     to: '/admin/payments' },
  { icon: '📋', label: 'Applications',  desc: 'View visa applications', to: '/admin/applications' },
  { icon: '📊', label: 'Analytics',     desc: 'View traffic & revenue', to: '/admin/analytics' },
  { icon: '🔔', label: 'Notifications', desc: 'Check alerts',           to: '/admin/notifications' },
  { icon: '⚙️', label: 'Settings',      desc: 'Configure system',       to: '/admin/settings' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats]           = useState(null)
  const [notifications, setNotifs]  = useState([])
  const [logs, setLogs]             = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    Promise.all([api.getStats(), api.getNotifications(), api.getLogs()])
      .then(([s, n, l]) => { setStats(s); setNotifs(n.slice(0, 6)); setLogs(l.slice(0, 6)) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="admin-page-header"><p>Loading dashboard…</p></div>

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
          <div className="stat-card-value">{stats?.totalUsers?.toLocaleString() ?? 0}</div>
          <div className="stat-card-sub up">↑ {stats?.newToday ?? 0} new today</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-label">Active Users</div>
          <div className="stat-card-value">{stats?.activeUsers?.toLocaleString() ?? 0}</div>
          <div className="stat-card-sub">
            {stats?.totalUsers ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}% of total
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📋</div>
          <div className="stat-card-label">Applications</div>
          <div className="stat-card-value">{stats?.totalApplications ?? 0}</div>
          <div className="stat-card-sub up">Total submitted</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">💷</div>
          <div className="stat-card-label">Total Revenue</div>
          <div className="stat-card-value">£{Number(stats?.revenue ?? 0).toLocaleString()}</div>
          <div className="stat-card-sub up">Paid transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⏳</div>
          <div className="stat-card-label">Pending Payments</div>
          <div className="stat-card-value">{stats?.pendingPayments ?? 0}</div>
          <div className="stat-card-sub down">Needs attention</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✉️</div>
          <div className="stat-card-label">Messages</div>
          <div className="stat-card-value">{stats?.totalMessages ?? 0}</div>
          <div className="stat-card-sub">Contact form submissions</div>
        </div>
      </div>

      {/* Notifications + Logs */}
      <div className="admin-grid-2" style={{ marginBottom: '24px' }}>
        <div className="admin-card">
          <h3>Recent Notifications</h3>
          {notifications.length === 0 ? (
            <p style={{ color: 'var(--a-muted)', fontSize: '0.85rem' }}>No notifications yet.</p>
          ) : (
            <div className="notif-list">
              {notifications.map(n => (
                <div key={n.id} className="notif-item">
                  <div className={`notif-dot ${n.read ? 'read' : ''}`} />
                  <div className="notif-text" style={{ fontWeight: n.read ? 400 : 600 }}>{n.message}</div>
                  <div className="notif-time">{new Date(n.created_at).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card">
          <h3>Recent Logs</h3>
          {logs.length === 0 ? (
            <p style={{ color: 'var(--a-muted)', fontSize: '0.85rem' }}>No logs yet.</p>
          ) : (
            <div className="activity-list">
              {logs.map(l => (
                <div key={l.id} className="activity-item">
                  <span className={`log-level-${l.level}`} style={{ fontWeight: 700, fontSize: '0.72rem', minWidth: 40 }}>{l.level}</span>
                  <div className="activity-text">{l.message}</div>
                  <div className="activity-time">{new Date(l.created_at).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}
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
