const router = require('express').Router()
const pool = require('../db')
const auth = require('../middleware/auth')

// GET /api/logs
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM logs ORDER BY created_at DESC LIMIT 200')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/logs  (internal use — log an event)
router.post('/', auth, async (req, res) => {
  const { level, source, message } = req.body
  try {
    const { rows } = await pool.query(
      'INSERT INTO logs (level, source, message) VALUES ($1, $2, $3) RETURNING *',
      [level || 'INFO', source, message]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
