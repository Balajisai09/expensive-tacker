import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

// User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currency: { type: String, default: 'USD' }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // MongoDB connection - use environment variable
    const MONGODB_URI = process.env.MONGODB_URI
    
    if (!MONGODB_URI) {
      console.error('MONGODB_URI not found in environment')
      return res.status(500).json({ message: 'Database configuration error' })
    }
    
    // Always connect in serverless environment
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      console.error('Database connection state:', mongoose.connection.readyState)
      return res.status(503).json({ message: 'Database connection error. Please try again.' })
    }

    const user = await User.findOne({ email }).maxTimeMS(5000)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  } finally {
    // Close connection in serverless environment
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect()
    }
  }
}
