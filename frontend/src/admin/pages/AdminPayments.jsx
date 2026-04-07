import { useState } from 'react'
import { mockTransactions } from '../mockData'

export default function AdminPayments() {
  const [txns, setTxns]     = useState(mockTransactions)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const FILTERS = ['All', 'Paid', 'Pending', 'Failed', 'Refunded']

  const filtered = txns.filter(t => {
    const matchFilter = filter === 'All' || t.status === filter
    const matchSearch = t.user.toLowerCase().includes(search.toLowerCase()) ||
                        t.id.toLowerCase().includes(search.toLowerCase()) ||
                        t.service.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const total   = txns.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0)
  const pending = txns.filter(t => t.status === 'Pending').reduce((s, t) => s + t.amount, 0)

  function refund(id) {
    if (window.confirm('Process refund for this transaction?')) {
      setTxns(prev => prev.map(t => t.id === id ? { ...t, status: 'Refunded' } : t))
    }
  }

  function exportCSV() {
    const rows = [
      ['ID', 'User', 'Service', 'Amount', 'Status', 'Date'],
      ...filtered.map(t => [t.id, t.user, t.service, `£${t.amount}`, t.status, t.date]),
    ]
    const csv  = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'transactions.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Payments & Transactions</h1>
        <p>Monitor all payments, manage refunds, and export reports.</p>
      </div>

      <div className="stat-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-card-icon">💷</div>
          <div className="stat-card-label">Total Collected</div>
          <div className="stat-card-value">£{total.toLocaleString()}</div>
          <div className="stat-card-sub up">Paid transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⏳</div>
          <div className="stat-card-label">Pending</div>
          <div className="stat-card-value">£{pending.toLocaleString()}</div>
          <div className="stat-card-sub down">Awaiting payment</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">❌</div>
          <div className="stat-card-label">Failed</div>
          <div className="stat-card-value">{txns.filter(t => t.status === 'Failed').length}</div>
          <div className="stat-card-sub down">Needs follow-up</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">↩️</div>
          <div className="stat-card-label">Refunded</div>
          <div className="stat-card-value">{txns.filter(t => t.status === 'Refunded').length}</div>
          <div className="stat-card-sub">Processed</div>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <h3>Transactions ({filtered.length})</h3>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`btn-admin ${filter === f ? 'btn-admin-gold' : 'btn-admin-ghost'}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="admin-table-search">
            <span style={{ color: 'var(--a-muted)' }}>🔍</span>
            <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-admin btn-admin-ghost" onClick={exportCSV}>⬇ Export CSV</button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--a-muted)', fontSize: '0.78rem' }}>{t.id}</td>
                <td style={{ fontWeight: 600 }}>{t.user}</td>
                <td style={{ color: 'var(--a-muted)' }}>{t.service}</td>
                <td style={{ fontWeight: 700 }}>£{t.amount.toLocaleString()}</td>
                <td><span className={`badge badge-${t.status.toLowerCase()}`}>{t.status}</span></td>
                <td style={{ color: 'var(--a-muted)' }}>{t.date}</td>
                <td>
                  {t.status === 'Paid' && (
                    <button className="btn-admin btn-admin-danger" onClick={() => refund(t.id)}>Refund</button>
                  )}
                  {t.status === 'Failed' && (
                    <button className="btn-admin btn-admin-ghost">Retry</button>
                  )}
                  {(t.status === 'Pending' || t.status === 'Refunded') && (
                    <span style={{ color: 'var(--a-muted)', fontSize: '0.78rem' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
