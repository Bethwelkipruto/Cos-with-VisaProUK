const router = require('express').Router()
const pool = require('../db')
const auth = require('../middleware/auth')
const transporter = require('../mailer')

// GET /api/applications
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM applications ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/applications  (public — submitted from frontend)
router.post('/', async (req, res) => {
  const { full_name, email, phone, visa_type, nationality, message } = req.body
  if (!full_name || !email || !visa_type) return res.status(400).json({ error: 'Full name, email and visa type are required' })

  try {
    const { rows } = await pool.query(
      `INSERT INTO applications (full_name, email, phone, visa_type, nationality, message)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_name, email, phone, visa_type, nationality, message]
    )

    // Send email notification
    await transporter.sendMail({
      from: `"HC-One Immigration" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `New Visa Application — ${visa_type}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Visa Type:</strong> ${visa_type}</p>
        <p><strong>Nationality:</strong> ${nationality || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    })

    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/applications/:id  (update status)
router.put('/:id', auth, async (req, res) => {
  const { status, notes } = req.body
  try {
    const { rows } = await pool.query(
      'UPDATE applications SET status=$1, notes=$2 WHERE id=$3 RETURNING *',
      [status, notes, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Application not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/applications/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM applications WHERE id = $1', [req.params.id])
    res.json({ message: 'Application deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
