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
      to: 'bethwel.c7@gmail.com',
      subject: `📬 New Contact Message — ${subject || 'General Enquiry'}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
          <div style="background:#0a1628;padding:24px;text-align:center">
            <h1 style="color:#c8922a;margin:0;font-size:1.4rem">🇬🇧 HC-One Immigration</h1>
            <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:0.85rem">New Contact Form Message</p>
          </div>
          <div style="padding:28px;background:#fff">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6">${phone || 'N/A'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600">${subject || 'N/A'}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;vertical-align:top">Message</td><td style="padding:10px 0">${message}</td></tr>
            </table>
            <div style="margin-top:24px;text-align:center">
              <a href="https://cos-with-visa-pro-uk.vercel.app/admin/messages" style="background:#c8922a;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:700">View in Admin Dashboard</a>
            </div>
          </div>
          <div style="background:#f9fafb;padding:14px;text-align:center;font-size:0.75rem;color:#9ca3af">
            HC-One Immigration Services Ltd &nbsp;·&nbsp; Received ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })} UK time
          </div>
        </div>
      `,
    })).catch(err => console.error('[Email]', err.message))
    res.json({ message: 'Message sent successfully' })
  } catch (err) { next(err) }
})

module.exports = router
