const router = require('express').Router()
const pool = require('../db')
const transporter = require('../mailer')
const { validateContact } = require('../middleware/validate')
const { emailBreaker } = require('../middleware/protection')

// POST /api/contact
router.post('/', validateContact, async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body
  try {
    await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone, subject, message]
    )
    emailBreaker.call(() => transporter.sendMail({
      from: `"HC-One Immigration" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `New Contact Message — ${subject || 'General Enquiry'}`,
      html: `<h2>New Contact Form Submission</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || 'N/A'}</p><p><b>Subject:</b> ${subject || 'N/A'}</p><p><b>Message:</b><br/>${message}</p>`,
    })).catch(err => console.error('[Email]', err.message))
    res.json({ message: 'Message sent successfully' })
  } catch (err) { next(err) }
})

module.exports = router
