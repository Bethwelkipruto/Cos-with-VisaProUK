require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth',         require('./routes/auth'))
app.use('/api/users',        require('./routes/users'))
app.use('/api/applications', require('./routes/applications'))
app.use('/api/payments',     require('./routes/payments'))
app.use('/api/contact',      require('./routes/contact'))

app.get('/', (req, res) => res.json({ status: 'HC-One backend running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
