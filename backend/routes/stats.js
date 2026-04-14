const router = require('express').Router()
const pool = require('../db')
const auth = require('../middleware/auth')

// GET /api/stats
router.get('/', auth, async (req, res) => {
  try {
    const [users, payments, applications, contacts] = await Promise.all([
      pool.query('SELECT COUNT(*) total, COUNT(*) FILTER (WHERE status=\'Active\') active, COUNT(*) FILTER (WHERE joined = CURRENT_DATE) new_today FROM admin_users'),
      pool.query('SELECT COALESCE(SUM(amount) FILTER (WHERE status=\'Paid\'),0) revenue, COUNT(*) FILTER (WHERE status=\'Pending\') pending FROM payments'),
      pool.query('SELECT COUNT(*) total FROM applications'),
      pool.query('SELECT COUNT(*) total FROM contact_messages'),
    ])
    res.json({
      totalUsers:      Number(users.rows[0].total),
      activeUsers:     Number(users.rows[0].active),
      newToday:        Number(users.rows[0].new_today),
      revenue:         Number(payments.rows[0].revenue),
      pendingPayments: Number(payments.rows[0].pending),
      totalApplications: Number(applications.rows[0].total),
      totalMessages:   Number(contacts.rows[0].total),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
