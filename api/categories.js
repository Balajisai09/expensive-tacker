export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Mock categories
  const mockCategories = [
    { id: '1', name: 'Food', type: 'expense' },
    { id: '2', name: 'Transport', type: 'expense' },
    { id: '3', name: 'Entertainment', type: 'expense' },
    { id: '4', name: 'Salary', type: 'income' },
    { id: '5', name: 'Freelance', type: 'income' }
  ]

  try {
    if (req.method === 'GET') {
      res.json(mockCategories)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
