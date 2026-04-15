const router = require('express').Router()
const pool = require('../db')
const transporter = require('../mailer')
const { validateApplication } = require('../middleware/validate')
const { emailBreaker } = require('../middleware/protection')
const auth = require('../middleware/auth')

// GET /api/applications
router.get('/', auth, async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM applications ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) { next(err) }
})

// POST /api/applications
router.post('/', validateApplication, async (req, res, next) => {
  const { full_name, email, phone, visa_type, nationality, message } = req.body
  try {
    const { rows } = await pool.query(
      `INSERT INTO applications (full_name, email, phone, visa_type, nationality, message)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_name, email, phone, visa_type, nationality, message]
    )
    // Send email via circuit breaker
    emailBreaker.call(() => transporter.sendMail({
      from: `"HC-One Immigration" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `New Visa Application — ${visa_type}`,
      html: `<h2>New Application</h2><p><b>Name:</b> ${full_name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || 'N/A'}</p><p><b>Visa:</b> ${visa_type}</p><p><b>Nationality:</b> ${nationality || 'N/A'}</p><p><b>Message:</b> ${message || 'N/A'}</p>`,
    })).catch(err => console.error('[Email]', err.message))
    res.status(201).json(rows[0])
  } catch (err) { next(err) }
})

// PUT /api/applications/:id
router.put('/:id', auth, async (req, res, next) => {
  const { status, notes } = req.body
  try {
    const { rows } = await pool.query(
      'UPDATE applications SET status=$1, notes=$2 WHERE id=$3 RETURNING *',
      [status, notes, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Application not found' })
    res.json(rows[0])
  } catch (err) { next(err) }
})

// DELETE /api/applications/:id
router.delete('/:id', auth, async (req, res, next) => {
  try {
    await pool.query('DELETE FROM applications WHERE id = $1', [req.params.id])
    res.json({ message: 'Application deleted' })
  } catch (err) { next(err) }
})

module.exports = router
