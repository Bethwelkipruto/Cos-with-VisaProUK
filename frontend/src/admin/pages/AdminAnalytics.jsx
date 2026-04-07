import { mockAnalytics, mockTransactions, mockUsers } from '../mockData'

export default function AdminAnalytics() {
  const maxRev  = Math.max(...mockAnalytics.revenue)
  const maxUser = Math.max(...mockAnalytics.users)

  const byStatus = ['Paid','Pending','Failed','Refunded'].map(s => ({
    label: s,
    count: mockTransactions.filter(t => t.status === s).length,
    amount: mockTransactions.filter(t => t.status === s).reduce((a, t) => a + t.amount, 0),
  }))

  const byRole = ['Admin','Editor','Viewer'].map(r => ({
    label: r,
    count: mockUsers.filter(u => u.role === r).length,
  }))

  return (
    <>
      <div className="admin-page-header">
        <h1>Analytics</h1>
        <p>Revenue trends, user growth, and transaction breakdowns.</p>
      </div>

      <div className="admin-grid-2" style={{ marginBottom: '24px' }}>
        {/* Revenue chart */}
        <div className="admin-card">
          <h3>Monthly Revenue (£)</h3>
          <div className="bar-chart">
            {mockAnalytics.months.map((m, i) => (
              <div key={m} className="bar-col">
                <div className="bar-value">£{(mockAnalytics.revenue[i]/1000).toFixed(1)}k</div>
                <div
                  className="bar-fill"
                  style={{ height: `${(mockAnalytics.revenue[i] / maxRev) * 100}px` }}
                />
                <div className="bar-label">{m}</div>
              </div>
            ))}
          </div>
        </div>

        {/* User growth chart */}
        <div className="admin-card">
          <h3>New Users per Month</h3>
          <div className="bar-chart">
            {mockAnalytics.months.map((m, i) => (
              <div key={m} className="bar-col">
                <div className="bar-value">{mockAnalytics.users[i]}</div>
                <div
                  className="bar-fill"
                  style={{
                    height: `${(mockAnalytics.users[i] / maxUser) * 100}px`,
                    background: 'linear-gradient(to top, var(--a-info), #60a5fa)',
                  }}
                />
                <div className="bar-label">{m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-grid-2">
        {/* Payment breakdown */}
        <div className="admin-card">
          <h3>Payment Breakdown</h3>
          <table className="admin-table">
            <thead>
              <tr><th>Status</th><th>Count</th><th>Total</th></tr>
            </thead>
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

        {/* Users by role */}
        <div className="admin-card">
          <h3>Users by Role</h3>
          <table className="admin-table">
            <thead>
              <tr><th>Role</th><th>Count</th><th>Share</th></tr>
            </thead>
            <tbody>
              {byRole.map(r => (
                <tr key={r.label}>
                  <td><span className={`badge badge-${r.label.toLowerCase()}`}>{r.label}</span></td>
                  <td>{r.count}</td>
                  <td style={{ color: 'var(--a-muted)' }}>
                    {Math.round((r.count / mockUsers.length) * 100)}%
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
