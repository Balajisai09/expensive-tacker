export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Mock reports data
  const mockReports = {
    summary: {
      totalIncome: 3000,
      totalExpenses: 1200,
      balance: 1800,
      savingsRate: 40
    },
    categoryBreakdown: [
      { category: 'Food', amount: 500, percentage: 41.7 },
      { category: 'Transport', amount: 200, percentage: 16.7 },
      { category: 'Entertainment', amount: 300, percentage: 25 },
      { category: 'Other', amount: 200, percentage: 16.7 }
    ],
    monthlyTrend: [
      { month: '2025-10', income: 2800, expenses: 1100 },
      { month: '2025-11', income: 3000, expenses: 1300 },
      { month: '2025-12', income: 3200, expenses: 1500 },
      { month: '2026-01', income: 3000, expenses: 1200 }
    ]
  }

  try {
    if (req.method === 'GET') {
      res.json(mockReports)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
