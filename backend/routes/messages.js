const router = require('express').Router()
const pool = require('../db')
const auth = require('../middleware/auth')

// GET /api/messages
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/messages/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_messages WHERE id=$1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
