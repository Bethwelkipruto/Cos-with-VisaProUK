// Input Validation — sanitize all user inputs to prevent attacks

function sanitizeString(str) {
  if (typeof str !== 'string') return str
  return str.trim().replace(/<[^>]*>/g, '') // strip HTML tags
}

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj
  const clean = {}
  for (const key of Object.keys(obj)) {
    clean[key] = typeof obj[key] === 'string' ? sanitizeString(obj[key]) : obj[key]
  }
  return clean
}

function validateContact(req, res, next) {
  const { name, email, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email address' })
  req.body = sanitizeObject(req.body)
  next()
}

function validateApplication(req, res, next) {
  const { full_name, email, visa_type } = req.body
  if (!full_name || !email || !visa_type) return res.status(400).json({ error: 'Full name, email and visa type are required' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email address' })
  req.body = sanitizeObject(req.body)
  next()
}

function validateUser(req, res, next) {
  const { name, email } = req.body
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email address' })
  req.body = sanitizeObject(req.body)
  next()
}

module.exports = { validateContact, validateApplication, validateUser, sanitizeObject }
