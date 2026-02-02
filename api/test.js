import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Mock successful registration for testing
    const JWT_SECRET = process.env.JWT_SECRET || 'test-secret'
    const token = jwt.sign({ userId: 'test-user-id' }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      user: { id: 'test-user-id', name, email },
      token,
    })
  } catch (error) {
    console.error('Test error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
