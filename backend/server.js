require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: ['https://cos-with-visa-pro-uk.vercel.app', 'http://localhost:5173'], credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth',          require('./routes/auth'))
app.use('/api/users',         require('./routes/users'))
app.use('/api/applications',  require('./routes/applications'))
app.use('/api/payments',      require('./routes/payments'))
app.use('/api/contact',       require('./routes/contact'))
app.use('/api/stats',         require('./routes/stats'))
app.use('/api/notifications', require('./routes/notifications'))
app.use('/api/logs',          require('./routes/logs'))

app.get('/', (req, res) => res.json({ status: 'HC-One backend running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
