const router = require('express').Router()
const pool = require('../db')
const transporter = require('../mailer')

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required' })

  try {
    await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone, subject, message]
    )

    await transporter.sendMail({
      from: `"HC-One Immigration" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `New Contact Message — ${subject || 'General Enquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    res.json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
