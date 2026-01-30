import express from 'express'
import Budget from '../models/Budget.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find()
    res.json(budgets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get budget by ID
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)
    if (!budget) return res.status(404).json({ message: 'Budget not found' })
    res.json(budget)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create budget
router.post('/', async (req, res) => {
  const budget = new Budget(req.body)
  try {
    const savedBudget = await budget.save()
    res.status(201).json(savedBudget)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update budget
router.put('/:id', async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(budget)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete budget
router.delete('/:id', async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id)
    res.json({ message: 'Budget deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
