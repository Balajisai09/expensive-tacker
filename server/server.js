import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import transactionRoutes from './routes/transactions.js'
import budgetRoutes from './routes/budgets.js'
import categoryRoutes from './routes/categories.js'
import reportsRoutes from './routes/reports.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker'

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Handle connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected')
})

// Routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/budgets', budgetRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/reports', reportsRoutes)
app.use('/api/auth', authRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
