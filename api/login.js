export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Simple success response for testing
    const user = { id: 'test123', name: 'Test User', email }
    const token = 'test-jwt-token'

    res.json({ user, token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
