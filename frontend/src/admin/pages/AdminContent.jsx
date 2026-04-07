import { useState } from 'react'
import { useAuth } from '../AuthContext'

const INITIAL_PAGES = [
  { id: 1, page: 'Home',         section: 'Hero',         status: 'Published', updated: '2025-04-08' },
  { id: 2, page: 'Services',     section: 'Service Cards', status: 'Published', updated: '2025-04-09' },
  { id: 3, page: 'Visa Types',   section: 'Visa Cards',   status: 'Published', updated: '2025-04-07' },
  { id: 4, page: 'Documents',    section: 'Fee Summary',  status: 'Published', updated: '2025-04-10' },
  { id: 5, page: 'FAQ',          section: 'FAQ Items',    status: 'Draft',     updated: '2025-04-05' },
  { id: 6, page: 'Testimonials', section: 'Reviews',      status: 'Published', updated: '2025-04-06' },
  { id: 7, page: 'Contact',      section: 'Contact Form', status: 'Published', updated: '2025-04-08' },
  { id: 8, page: 'Process',      section: 'Steps',        status: 'Draft',     updated: '2025-04-04' },
]

export default function AdminContent() {
  const { user } = useAuth()
  const canEdit = user?.role === 'Admin' || user?.role === 'Editor'

  const [pages, setPages] = useState(INITIAL_PAGES)

  function toggleStatus(id) {
    setPages(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published', updated: new Date().toISOString().slice(0,10) } : p
    ))
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Content Management</h1>
        <p>Manage and publish content across all public-facing pages.</p>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <h3>Site Pages ({pages.length})</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Section</th>
              <th>Status</th>
              <th>Last Updated</th>
              {canEdit && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pages.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.page}</td>
                <td style={{ color: 'var(--a-muted)' }}>{p.section}</td>
                <td>
                  <span className={`badge ${p.status === 'Published' ? 'badge-active' : 'badge-pending'}`}>
                    {p.status}
                  </span>
                </td>
                <td style={{ color: 'var(--a-muted)' }}>{p.updated}</td>
                {canEdit && (
                  <td>
                    <div className="btn-row">
                      <button className="btn-admin btn-admin-ghost" onClick={() => alert(`Edit "${p.page} — ${p.section}" — connect to CMS when backend is ready.`)}>
                        Edit
                      </button>
                      <button
                        className={`btn-admin ${p.status === 'Published' ? 'btn-admin-danger' : 'btn-admin-success'}`}
                        onClick={() => toggleStatus(p.id)}
                      >
                        {p.status === 'Published' ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
