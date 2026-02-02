import jwt from 'jsonwebtoken'

// Simple in-memory storage for testing
const users = new Map()

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { url, method } = req

  try {
    if (url.endsWith('/register') && method === 'POST') {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
      }

      if (users.has(email)) {
        return res.status(400).json({ message: 'Email already exists' })
      }

      const user = {
        id: `user_${Date.now()}`,
        name,
        email,
        createdAt: new Date().toISOString()
      }

      users.set(email, user)

      const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

      return res.status(201).json({ user, token })
    }

    if (url.endsWith('/login') && method === 'POST') {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
      }

      const user = users.get(email)
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

      return res.json({ user, token })
    }

    return res.status(404).json({ message: 'Endpoint not found' })
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}
