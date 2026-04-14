const router = require('express').Router()
const pool = require('../db')
const auth = require('../middleware/auth')

// GET /api/payments
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM payments ORDER BY date DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/payments
router.post('/', auth, async (req, res) => {
  const { user_name, service, amount, status } = req.body
  if (!user_name || !service || !amount) return res.status(400).json({ error: 'user_name, service and amount required' })

  try {
    const { rows } = await pool.query(
      `INSERT INTO payments (user_name, service, amount, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_name, service, amount, status || 'Pending']
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/payments/:id
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body
  try {
    const { rows } = await pool.query(
      'UPDATE payments SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Payment not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
