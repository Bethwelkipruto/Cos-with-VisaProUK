import { useState, useRef } from 'react'

const INITIAL_MEDIA = [
  { id: 1, name: 'hero-banner.jpg',    type: 'image', size: '245 KB', uploaded: '2025-04-01' },
  { id: 2, name: 'visa-guide.pdf',     type: 'pdf',   size: '1.2 MB', uploaded: '2025-04-03' },
  { id: 3, name: 'cos-checklist.pdf',  type: 'pdf',   size: '890 KB', uploaded: '2025-04-05' },
  { id: 4, name: 'team-photo.jpg',     type: 'image', size: '512 KB', uploaded: '2025-04-07' },
  { id: 5, name: 'logo-white.png',     type: 'image', size: '34 KB',  uploaded: '2025-04-08' },
]

const TYPE_ICON = { image: '🖼️', pdf: '📄', video: '🎬', other: '📁' }

export default function AdminMedia() {
  const [media, setMedia]   = useState(INITIAL_MEDIA)
  const [filter, setFilter] = useState('All')
  const inputRef = useRef()

  const FILTERS = ['All', 'image', 'pdf']

  const filtered = media.filter(m => filter === 'All' || m.type === filter)

  function handleUpload(e) {
    const files = Array.from(e.target.files)
    const newItems = files.map(f => ({
      id: Date.now() + Math.random(),
      name: f.name,
      type: f.type.startsWith('image') ? 'image' : f.type === 'application/pdf' ? 'pdf' : 'other',
      size: `${(f.size / 1024).toFixed(0)} KB`,
      uploaded: new Date().toISOString().slice(0, 10),
    }))
    setMedia(prev => [...newItems, ...prev])
  }

  function deleteMedia(id) {
    if (window.confirm('Delete this file?')) setMedia(prev => prev.filter(m => m.id !== id))
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Media Library</h1>
        <p>Upload and manage images, PDFs, and documents.</p>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <h3>Files ({filtered.length})</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`btn-admin ${filter === f ? 'btn-admin-gold' : 'btn-admin-ghost'}`}
                onClick={() => setFilter(f)}
              >
                {f === 'All' ? 'All' : f.toUpperCase()}
              </button>
            ))}
          </div>
          <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={handleUpload} />
          <button className="btn-admin btn-admin-gold" onClick={() => inputRef.current.click()}>
            ⬆ Upload
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Type</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{TYPE_ICON[m.type] ?? TYPE_ICON.other}</span>
                    <span style={{ fontWeight: 500 }}>{m.name}</span>
                  </div>
                </td>
                <td><span className="badge badge-editor">{m.type.toUpperCase()}</span></td>
                <td style={{ color: 'var(--a-muted)' }}>{m.size}</td>
                <td style={{ color: 'var(--a-muted)' }}>{m.uploaded}</td>
                <td>
                  <div className="btn-row">
                    <button className="btn-admin btn-admin-ghost" onClick={() => alert(`Copy link for ${m.name}`)}>Copy Link</button>
                    <button className="btn-admin btn-admin-danger" onClick={() => deleteMedia(m.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
