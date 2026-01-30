import express from 'express'
import Transaction from '../models/Transaction.js'

const router = express.Router()

// Get summary
router.get('/summary', async (req, res) => {
  try {
    const transactions = await Transaction.find()
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    res.json({
      income,
      expense,
      balance: income - expense,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get category breakdown
router.get('/category-breakdown', async (req, res) => {
  try {
    const transactions = await Transaction.find({ type: 'expense' })
    const breakdown = {}

    transactions.forEach((t) => {
      if (breakdown[t.category]) {
        breakdown[t.category] += t.amount
      } else {
        breakdown[t.category] = t.amount
      }
    })

    const data = Object.entries(breakdown).map(([name, value]) => ({
      name,
      value,
    }))

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get monthly trend
router.get('/monthly-trend', async (req, res) => {
  try {
    const transactions = await Transaction.find()
    const monthlyData = {}

    transactions.forEach((t) => {
      const monthKey = new Date(t.date).toISOString().slice(0, 7)
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 }
      }

      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount
      } else {
        monthlyData[monthKey].expense += t.amount
      }
    })

    const data = Object.entries(monthlyData)
      .map(([month, values]) => ({
        month,
        ...values,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get expense vs income
router.get('/expense-vs-income', async (req, res) => {
  try {
    const transactions = await Transaction.find()
    const monthlyData = {}

    transactions.forEach((t) => {
      const monthKey = new Date(t.date).toISOString().slice(0, 7)
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 }
      }

      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount
      } else {
        monthlyData[monthKey].expense += t.amount
      }
    })

    const data = Object.entries(monthlyData)
      .map(([month, values]) => ({
        month,
        ...values,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
