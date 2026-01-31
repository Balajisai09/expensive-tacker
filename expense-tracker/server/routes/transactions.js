import express from 'express'
import Transaction from '../models/Transaction.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' })
    res.json(transaction)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get transactions by category
router.get('/category/:category', async (req, res) => {
  try {
    const transactions = await Transaction.find({ category: req.params.category })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get transactions by date range
router.get('/range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    const transactions = await Transaction.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create transaction
router.post('/', async (req, res) => {
  const transaction = new Transaction(req.body)
  try {
    const savedTransaction = await transaction.save()
    res.status(201).json(savedTransaction)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(transaction)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id)
    res.json({ message: 'Transaction deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
