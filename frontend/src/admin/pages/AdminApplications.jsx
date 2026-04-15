import { useState, useEffect } from 'react'
import { api } from '../../api'

const STATUSES = ['All', 'Pending', 'In Review', 'Approved', 'Rejected']

export default function AdminApplications() {
  const [applications, setApplications] = useState([])
  const [selected, setSelected]         = useState(null)
  const [filter, setFilter]             = useState('All')
  const [search, setSearch]             = useState('')
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    api.getApplications()
      .then(setApplications)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function updateStatus(id, status) {
    try {
      const updated = await api.updateApplication(id, { status })
      setApplications(prev => prev.map(a => a.id === id ? updated : a))
      if (selected?.id === id) setSelected(updated)
    } catch (err) {
      alert(err.message)
    }
  }

  async function deleteApplication(id) {
    if (!window.confirm('Delete this application?')) return
    await api.deleteApplication(id)
    setApplications(prev => prev.filter(a => a.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = applications.filter(a => {
    const matchFilter = filter === 'All' || a.status === filter
    const matchSearch = a.full_name.toLowerCase().includes(search.toLowerCase()) ||
                        a.email.toLowerCase().includes(search.toLowerCase()) ||
                        a.visa_type.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const statusColor = { Pending: 'badge-pending', 'In Review': 'badge-editor', Approved: 'badge-active', Rejected: 'badge-suspended' }

  if (loading) return <div className="admin-page-header"><p>Loading applications…</p></div>

  return (
    <>
      <div className="admin-page-header">
        <h1>Visa Applications</h1>
        <p>All visa applications submitted through the website.</p>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ marginBottom: '24px' }}>
        {['Pending', 'In Review', 'Approved', 'Rejected'].map(s => (
          <div key={s} className="stat-card">
            <div className="stat-card-label">{s}</div>
            <div className="stat-card-value">{applications.filter(a => a.status === s).length}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '20px' }}>
        {/* Table */}
        <div className="admin-table-wrap">
          <div className="admin-table-toolbar">
            <h3>Applications ({filtered.length})</h3>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {STATUSES.map(s => (
                <button key={s} className={`btn-admin ${filter === s ? 'btn-admin-gold' : 'btn-admin-ghost'}`} onClick={() => setFilter(s)}>{s}</button>
              ))}
            </div>
            <div className="admin-table-search">
              <span style={{ color: 'var(--a-muted)' }}>🔍</span>
              <input placeholder="Search name, email or visa type…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <p>No applications yet. They will appear here when submitted from the website.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Visa Type</th><th>Nationality</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id} style={{ cursor: 'pointer', background: selected?.id === a.id ? 'rgba(200,146,42,0.08)' : '' }} onClick={() => setSelected(a)}>
                    <td style={{ fontWeight: 600 }}>{a.full_name}</td>
                    <td style={{ color: 'var(--a-muted)' }}>{a.visa_type}</td>
                    <td style={{ color: 'var(--a-muted)' }}>{a.nationality || '—'}</td>
                    <td><span className={`badge ${statusColor[a.status] || 'badge-pending'}`}>{a.status}</span></td>
                    <td style={{ color: 'var(--a-muted)', fontSize: '0.78rem' }}>{new Date(a.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-row">
                        <button className="btn-admin btn-admin-ghost" onClick={e => { e.stopPropagation(); setSelected(a) }}>View</button>
                        <button className="btn-admin btn-admin-danger" onClick={e => { e.stopPropagation(); deleteApplication(a.id) }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="admin-card" style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Application Detail</h3>
              <button className="btn-admin btn-admin-ghost" onClick={() => setSelected(null)}>✕ Close</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'FULL NAME',    value: selected.full_name },
                { label: 'EMAIL',        value: <a href={`mailto:${selected.email}`} style={{ color: 'var(--a-gold)', fontWeight: 600 }}>{selected.email}</a> },
                { label: 'PHONE',        value: selected.phone || '—' },
                { label: 'VISA TYPE',    value: selected.visa_type },
                { label: 'NATIONALITY',  value: selected.nationality || '—' },
                { label: 'MESSAGE',      value: selected.message || '—' },
                { label: 'SUBMITTED',    value: new Date(selected.created_at).toLocaleString() },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '0.88rem' }}>{value}</div>
                </div>
              ))}

              {/* Status update */}
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '8px' }}>UPDATE STATUS</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['Pending', 'In Review', 'Approved', 'Rejected'].map(s => (
                    <button
                      key={s}
                      className={`btn-admin ${selected.status === s ? 'btn-admin-gold' : 'btn-admin-ghost'}`}
                      onClick={() => updateStatus(selected.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="btn-row" style={{ marginTop: '8px' }}>
                <a href={`mailto:${selected.email}`} className="btn-admin btn-admin-gold" style={{ flex: 1, textAlign: 'center' }}>
                  Reply via Email
                </a>
                <button className="btn-admin btn-admin-danger" onClick={() => deleteApplication(selected.id)}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
