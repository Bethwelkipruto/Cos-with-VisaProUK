import { useState, useEffect } from 'react'
import { api } from '../../api'

export default function AdminAnalytics() {
  const [payments, setPayments] = useState([])
  const [users, setUsers]       = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([api.getPayments(), api.getUsers()])
      .then(([p, u]) => { setPayments(p); setUsers(u) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="admin-page-header"><p>Loading analytics…</p></div>

  // Group payments by month
  const monthlyRevenue = {}
  payments.forEach(p => {
    const month = p.date ? new Date(p.date).toLocaleString('default', { month: 'short' }) : 'N/A'
    if (!monthlyRevenue[month]) monthlyRevenue[month] = 0
    if (p.status === 'Paid') monthlyRevenue[month] += Number(p.amount)
  })
  const months     = Object.keys(monthlyRevenue)
  const revenues   = Object.values(monthlyRevenue)
  const maxRev     = Math.max(...revenues, 1)

  // Group users by month joined
  const monthlyUsers = {}
  users.forEach(u => {
    const month = u.joined ? new Date(u.joined).toLocaleString('default', { month: 'short' }) : 'N/A'
    monthlyUsers[month] = (monthlyUsers[month] || 0) + 1
  })
  const userMonths = Object.keys(monthlyUsers)
  const userCounts = Object.values(monthlyUsers)
  const maxUsers   = Math.max(...userCounts, 1)

  const byStatus = ['Paid', 'Pending', 'Failed', 'Refunded'].map(s => ({
    label: s,
    count:  payments.filter(t => t.status === s).length,
    amount: payments.filter(t => t.status === s).reduce((a, t) => a + Number(t.amount), 0),
  }))

  const byRole = ['Admin', 'Editor', 'Viewer'].map(r => ({
    label: r,
    count: users.filter(u => u.role === r).length,
  }))

  return (
    <>
      <div className="admin-page-header">
        <h1>Analytics</h1>
        <p>Revenue trends, user growth, and transaction breakdowns.</p>
      </div>

      <div className="admin-grid-2" style={{ marginBottom: '24px' }}>
        <div className="admin-card">
          <h3>Monthly Revenue (£)</h3>
          {months.length === 0 ? <p style={{ color: 'var(--a-muted)' }}>No payment data yet.</p> : (
            <div className="bar-chart">
              {months.map((m, i) => (
                <div key={m} className="bar-col">
                  <div className="bar-value">£{(revenues[i] / 1000).toFixed(1)}k</div>
                  <div className="bar-fill" style={{ height: `${(revenues[i] / maxRev) * 100}px` }} />
                  <div className="bar-label">{m}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card">
          <h3>New Users per Month</h3>
          {userMonths.length === 0 ? <p style={{ color: 'var(--a-muted)' }}>No user data yet.</p> : (
            <div className="bar-chart">
              {userMonths.map((m, i) => (
                <div key={m} className="bar-col">
                  <div className="bar-value">{userCounts[i]}</div>
                  <div className="bar-fill" style={{ height: `${(userCounts[i] / maxUsers) * 100}px`, background: 'linear-gradient(to top, var(--a-info), #60a5fa)' }} />
                  <div className="bar-label">{m}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h3>Payment Breakdown</h3>
          <table className="admin-table">
            <thead><tr><th>Status</th><th>Count</th><th>Total</th></tr></thead>
            <tbody>
              {byStatus.map(s => (
                <tr key={s.label}>
                  <td><span className={`badge badge-${s.label.toLowerCase()}`}>{s.label}</span></td>
                  <td>{s.count}</td>
                  <td style={{ fontWeight: 600 }}>£{s.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-card">
          <h3>Users by Role</h3>
          <table className="admin-table">
            <thead><tr><th>Role</th><th>Count</th><th>Share</th></tr></thead>
            <tbody>
              {byRole.map(r => (
                <tr key={r.label}>
                  <td><span className={`badge badge-${r.label.toLowerCase()}`}>{r.label}</span></td>
                  <td>{r.count}</td>
                  <td style={{ color: 'var(--a-muted)' }}>
                    {users.length ? Math.round((r.count / users.length) * 100) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
