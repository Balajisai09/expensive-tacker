import jwt from 'jsonwebtoken'

// Mock user storage (in production, use a real database)
const mockUsers = new Map()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Get user from mock storage
    const user = mockUsers.get(email)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate token (no password check for mock)
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    console.log('Mock user logged in:', { email, userId: user.id })

    res.json({
      user,
      token,
    })
  } catch (error) {
    console.error('Mock login error:', error)
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    })
  }
}
