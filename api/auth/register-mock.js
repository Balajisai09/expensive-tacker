import jwt from 'jsonwebtoken'

// Mock user storage (in production, use a real database)
const mockUsers = new Map()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user already exists
    if (mockUsers.has(email)) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // Create mock user
    const userId = `user_${Date.now()}`
    const user = {
      id: userId,
      name,
      email,
      createdAt: new Date().toISOString()
    }

    mockUsers.set(email, user)

    // Generate token
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })

    console.log('Mock user created:', { email, userId })

    res.status(201).json({
      user,
      token,
    })
  } catch (error) {
    console.error('Mock registration error:', error)
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    })
  }
}
