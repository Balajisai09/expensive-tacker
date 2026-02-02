export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Mock transaction data
  const mockTransactions = [
    {
      id: '1',
      description: 'Grocery Shopping',
      amount: 150.00,
      category: 'Food',
      date: '2026-01-15',
      type: 'expense'
    },
    {
      id: '2', 
      description: 'Salary',
      amount: 3000.00,
      category: 'Income',
      date: '2026-01-01',
      type: 'income'
    }
  ]

  try {
    if (req.method === 'GET') {
      res.json(mockTransactions)
    } else if (req.method === 'POST') {
      const newTransaction = {
        id: Date.now().toString(),
        ...req.body
      }
      res.status(201).json(newTransaction)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
