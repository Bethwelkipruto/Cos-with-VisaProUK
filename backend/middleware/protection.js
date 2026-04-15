// Rate Limiting — block users sending too many requests at once
const rateLimit = require('express-rate-limit')

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // stricter for login
  message: { error: 'Too many login attempts, please try again later.' },
})

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: { error: 'Too many submissions, please try again later.' },
})

// Circuit Breaker — track failing services and return graceful errors
class CircuitBreaker {
  constructor(name, threshold = 5, timeout = 30000) {
    this.name      = name
    this.failures  = 0
    this.threshold = threshold
    this.timeout   = timeout
    this.state     = 'CLOSED' // CLOSED | OPEN | HALF_OPEN
    this.nextTry   = null
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextTry) throw new Error(`${this.name} service unavailable. Please try again shortly.`)
      this.state = 'HALF_OPEN'
    }
    try {
      const result = await fn()
      this.failures = 0
      this.state    = 'CLOSED'
      return result
    } catch (err) {
      this.failures++
      if (this.failures >= this.threshold) {
        this.state   = 'OPEN'
        this.nextTry = Date.now() + this.timeout
        console.error(`[CircuitBreaker] ${this.name} OPEN after ${this.failures} failures`)
      }
      throw err
    }
  }
}

const emailBreaker = new CircuitBreaker('Email', 3, 60000)
const dbBreaker    = new CircuitBreaker('Database', 5, 30000)

// Meaningful Error Handler — never expose raw stack traces to users
function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const isDev  = process.env.NODE_ENV === 'development'

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} — ${err.message}`)

  res.status(status).json({
    error: status === 500 && !isDev ? 'Something went wrong. Please try again.' : err.message,
  })
}

module.exports = { generalLimiter, authLimiter, formLimiter, emailBreaker, dbBreaker, errorHandler }
