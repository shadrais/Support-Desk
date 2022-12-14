const { urlencoded } = require('express')
const express = require('express')
require('dotenv').config()
require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')
const cors = require('cors')

//Connect to database
connectDB()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Support Desk API',
  })
})

// Users routes
app.use('/api/users', require('./routes/userRoutes'))

// Tickets routes
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
