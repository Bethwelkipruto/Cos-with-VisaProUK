require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const { generalLimiter, authLimiter, formLimiter, errorHandler } = require('./middleware/protection')

const app = express()

// HTTPS everywhere — trust proxy for Render/Vercel SSL termination
app.set('trust proxy', 1)

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

// CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['https://cos-with-visa-pro-uk.vercel.app', 'http://localhost:5173']
    if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))

// Stripe webhook needs raw body — must be registered BEFORE express.json()
app.use('/api/payments/stripe/webhook', express.raw({ type: 'application/json' }))
app.use(express.json({ limit: '1mb' }))

// Rate Limiting
app.use('/api/', generalLimiter)
app.use('/api/auth/', authLimiter)
app.use('/api/contact/', formLimiter)
app.use('/api/applications/', formLimiter)

// Health Check — auto-restart crashed services immediately
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Routes
app.use('/api/auth',          require('./routes/auth'))
app.use('/api/users',         require('./routes/users'))
app.use('/api/applications',  require('./routes/applications'))
app.use('/api/payments',      require('./routes/payments'))
app.use('/api/contact',       require('./routes/contact'))
app.use('/api/stats',         require('./routes/stats'))
app.use('/api/notifications', require('./routes/notifications'))
app.use('/api/logs',          require('./routes/logs'))
app.use('/api/messages',      require('./routes/messages'))

app.get('/', (req, res) => res.json({ status: 'HC-One backend running' }))

// Email test — remove after confirming email works
app.get('/test-email', async (req, res) => {
  try {
    const transporter = require('./mailer')
    await transporter.sendMail({
      from: `"HC-One" <${process.env.MAIL_USER}>`,
      to: 'bethwel.c7@gmail.com',
      subject: 'HC-One Email Test',
      html: '<p>Email is working correctly from Render.</p>',
    })
    res.json({ status: 'Email sent successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Meaningful Error Handler — must be last
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
