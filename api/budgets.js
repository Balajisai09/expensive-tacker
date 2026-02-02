export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Mock budgets storage
  let mockBudgets = [
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
    } else if (req.method === 'POST') {
      const newBudget = {
        id: Date.now().toString(),
        ...req.body
      }
      mockBudgets.push(newBudget)
      res.status(201).json(newBudget)
    } else if (req.method === 'DELETE') {
      const { id } = req.query
      mockBudgets = mockBudgets.filter(budget => budget.id !== id)
      res.status(200).json({ message: 'Budget deleted successfully' })
    } else if (req.method === 'PUT') {
      const { id } = req.query
      const index = mockBudgets.findIndex(budget => budget.id === id)
      if (index !== -1) {
        mockBudgets[index] = { ...mockBudgets[index], ...req.body }
        res.json(mockBudgets[index])
      } else {
        res.status(404).json({ message: 'Budget not found' })
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Budget API error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
