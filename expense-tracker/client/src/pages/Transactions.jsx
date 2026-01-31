import { useState, useEffect } from 'react'
import { transactionAPI, categoryAPI } from '../services/api'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import './Transactions.css'

function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [transRes, catRes] = await Promise.all([
        transactionAPI.getAll(),
        categoryAPI.getAll(),
      ])
      setTransactions(transRes.data || [])
      setCategories(catRes.data || [])
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTransaction = async (data) => {
    try {
      const response = await transactionAPI.create(data)
      setTransactions([response.data, ...transactions])
      setShowForm(false)
    } catch (error) {
      console.error('Failed to add transaction:', error)
    }
  }

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id)
      setTransactions(transactions.filter((t) => t._id !== id))
    } catch (error) {
      console.error('Failed to delete transaction:', error)
    }
  }

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filter)

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="container transactions-page">
      <div className="transactions-header">
        <h1>Transactions</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Transaction'}
        </button>
      </div>

      {showForm && (
        <TransactionForm
          categories={categories}
          onSubmit={handleAddTransaction}
        />
      )}

      <div className="filter-buttons">
        <button
          className={`btn ${filter === 'all' ? 'btn-active' : 'btn-secondary'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn ${filter === 'income' ? 'btn-active' : 'btn-secondary'}`}
          onClick={() => setFilter('income')}
        >
          Income
        </button>
        <button
          className={`btn ${filter === 'expense' ? 'btn-active' : 'btn-secondary'}`}
          onClick={() => setFilter('expense')}
        >
          Expense
        </button>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  )
}

export default Transactions
