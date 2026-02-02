import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database connection error. Please try again.' })
    }

    const existingUser = await User.findOne({ email }).maxTimeMS(5000)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const user = new User({ name, email, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
