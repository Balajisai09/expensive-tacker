import { useState, useEffect } from 'react'
import { budgetAPI, transactionAPI } from '../services/api'
import BudgetForm from '../components/BudgetForm'
import BudgetList from '../components/BudgetList'
import './Budget.css'

function Budget() {
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [budgetRes, transRes] = await Promise.all([
        budgetAPI.getAll(),
        transactionAPI.getAll(),
      ])
      setBudgets(budgetRes.data || [])
      setTransactions(transRes.data || [])
    } catch (error) {
      console.error('Failed to fetch budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBudget = async (data) => {
    try {
      const response = await budgetAPI.create(data)
      setBudgets([...budgets, response.data])
      setShowForm(false)
    } catch (error) {
      console.error('Failed to add budget:', error)
    }
  }

  const handleDeleteBudget = async (id) => {
    try {
      await budgetAPI.delete(id)
      setBudgets(budgets.filter((b) => (b.id || b._id) !== id))
    } catch (error) {
      console.error('Failed to delete budget:', error)
    }
  }

  const getBudgetWithSpent = (budget) => {
    const spent = transactions
      .filter(
        (t) =>
          t.category === budget.category &&
          t.type === 'expense' &&
          new Date(t.date) >= new Date(budget.month)
      )
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      ...budget,
      spent,
      remaining: Math.max(0, budget.limit - spent),
      percentage: (spent / budget.limit) * 100,
    }
  }

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="container budget-page">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ New Budget'}
        </button>
      </div>

      {showForm && <BudgetForm onSubmit={handleAddBudget} />}

      <BudgetList
        budgets={budgets.map(getBudgetWithSpent)}
        onDelete={handleDeleteBudget}
      />
    </div>
  )
}

export default Budget
