import { useState, useEffect } from 'react'
import { api } from '../../api'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch]     = useState('')
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.getMessages()
      .then(setMessages)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function deleteMessage(id) {
    if (!window.confirm('Delete this message?')) return
    await api.deleteMessage(id)
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    (m.subject || '').toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="admin-page-header"><p>Loading messages…</p></div>

  return (
    <>
      <div className="admin-page-header">
        <h1>Contact Messages</h1>
        <p>All messages submitted through the contact form.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '20px' }}>
        {/* Messages list */}
        <div className="admin-table-wrap">
          <div className="admin-table-toolbar">
            <h3>Messages ({filtered.length})</h3>
            <div className="admin-table-search">
              <span style={{ color: 'var(--a-muted)' }}>🔍</span>
              <input placeholder="Search name, email or subject…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">✉️</div>
              <p>No messages yet. They will appear here when someone submits the contact form.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr
                    key={m.id}
                    style={{ cursor: 'pointer', background: selected?.id === m.id ? 'rgba(200,146,42,0.08)' : '' }}
                    onClick={() => setSelected(m)}
                  >
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td style={{ color: 'var(--a-muted)' }}>{m.email}</td>
                    <td style={{ color: 'var(--a-muted)' }}>{m.subject || '—'}</td>
                    <td style={{ color: 'var(--a-muted)', fontSize: '0.78rem' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-row">
                        <button className="btn-admin btn-admin-ghost" onClick={e => { e.stopPropagation(); setSelected(m) }}>View</button>
                        <button className="btn-admin btn-admin-danger" onClick={e => { e.stopPropagation(); deleteMessage(m.id) }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Message detail panel */}
        {selected && (
          <div className="admin-card" style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Message Detail</h3>
              <button className="btn-admin btn-admin-ghost" onClick={() => setSelected(null)}>✕ Close</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '4px' }}>FROM</div>
                <div style={{ fontWeight: 700 }}>{selected.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '4px' }}>EMAIL</div>
                <a href={`mailto:${selected.email}`} style={{ color: 'var(--a-gold)', fontWeight: 600 }}>{selected.email}</a>
              </div>
              {selected.phone && (
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '4px' }}>PHONE</div>
                  <div>{selected.phone}</div>
                </div>
              )}
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '4px' }}>SUBJECT</div>
                <div>{selected.subject || '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '4px' }}>MESSAGE</div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '14px', lineHeight: 1.7, fontSize: '0.88rem' }}>
                  {selected.message}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginBottom: '4px' }}>RECEIVED</div>
                <div style={{ color: 'var(--a-muted)' }}>{new Date(selected.created_at).toLocaleString()}</div>
              </div>
              <div className="btn-row" style={{ marginTop: '8px' }}>
                <a href={`mailto:${selected.email}`} className="btn-admin btn-admin-gold" style={{ flex: 1, textAlign: 'center' }}>
                  Reply via Email
                </a>
                <button className="btn-admin btn-admin-danger" onClick={() => deleteMessage(selected.id)}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
