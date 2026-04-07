import { useState } from 'react'
import { mockLogs } from '../mockData'

export default function AdminLogs() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const LEVELS = ['ALL', 'INFO', 'WARN', 'ERROR']

  const filtered = mockLogs.filter(l => {
    const matchLevel  = filter === 'ALL' || l.level === filter
    const matchSearch = l.message.toLowerCase().includes(search.toLowerCase()) ||
                        l.source.toLowerCase().includes(search.toLowerCase())
    return matchLevel && matchSearch
  })

  return (
    <>
      <div className="admin-page-header">
        <h1>System Logs</h1>
        <p>Audit trail of all system events, errors, and user actions.</p>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <h3>Logs ({filtered.length})</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {LEVELS.map(l => (
              <button
                key={l}
                className={`btn-admin ${filter === l ? 'btn-admin-gold' : 'btn-admin-ghost'}`}
                onClick={() => setFilter(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="admin-table-search">
            <span style={{ color: 'var(--a-muted)' }}>🔍</span>
            <input placeholder="Search logs…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Level</th>
              <th>Source</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id}>
                <td style={{ color: 'var(--a-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{l.time}</td>
                <td><span className={`log-level-${l.level}`} style={{ fontWeight: 700, fontSize: '0.78rem' }}>{l.level}</span></td>
                <td><span className="badge badge-editor">{l.source}</span></td>
                <td style={{ fontSize: '0.83rem' }}>{l.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
