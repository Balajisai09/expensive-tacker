import jwt from 'jsonwebtoken'

// Simple in-memory storage for demo
const users = new Map()

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user already exists
    if (users.has(email)) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // Create user
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const user = {
      id: userId,
      name,
      email,
      createdAt: new Date().toISOString()
    }

    users.set(email, user)

    // Generate proper JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log('User registered:', { email, userId: user.id })

    res.status(201).json({ 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      }, 
      token 
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
