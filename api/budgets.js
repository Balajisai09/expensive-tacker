export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Mock budgets
  const mockBudgets = [
    {
      id: '1',
      category: 'Food',
      amount: 500,
      spent: 150,
      month: '2026-01'
    },
    {
      id: '2',
      category: 'Transport',
      amount: 200,
      spent: 50,
      month: '2026-01'
    }
  ]

  try {
    if (req.method === 'GET') {
      res.json(mockBudgets)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
