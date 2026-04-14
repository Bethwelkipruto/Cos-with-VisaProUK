const router = require('express').Router()
const bcrypt = require('bcryptjs')
const pool = require('../db')
const auth = require('../middleware/auth')

// GET /api/users
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, role, status, joined, last_login FROM admin_users ORDER BY joined DESC'
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/users
router.post('/', auth, async (req, res) => {
  const { name, email, role, status, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' })

  try {
    const hash = await bcrypt.hash(password, 10)
    const { rows } = await pool.query(
      `INSERT INTO admin_users (name, email, role, status, password_hash)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, status, joined`,
      [name, email, role || 'Viewer', status || 'Active', hash]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/users/:id
router.put('/:id', auth, async (req, res) => {
  const { name, email, role, status } = req.body
  try {
    const { rows } = await pool.query(
      `UPDATE admin_users SET name=$1, email=$2, role=$3, status=$4
       WHERE id=$5 RETURNING id, name, email, role, status, joined, last_login`,
      [name, email, role, status, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'User not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/users/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM admin_users WHERE id = $1', [req.params.id])
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
