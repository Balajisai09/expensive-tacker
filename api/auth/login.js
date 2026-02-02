export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = { 
      id: `user_${Date.now()}`, 
      name: 'Test User', 
      email 
    }
    
    const token = `token_${Date.now()}`

    res.json({ user, token })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
