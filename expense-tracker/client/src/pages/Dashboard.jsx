import { useState, useEffect } from 'react'
import { transactionAPI, budgetAPI } from '../services/api'
import StatCard from '../components/StatCard'
import RecentTransactions from '../components/RecentTransactions'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    budgetAlert: false,
  })
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [transRes, budgetRes] = await Promise.all([
        transactionAPI.getAll(),
        budgetAPI.getAll(),
      ])

      const transactions = transRes.data || []
      const budgets = budgetRes.data || []

      // Calculate stats
      const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

      const expense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

      // Check budget alerts
      const budgetAlert = budgets.some((b) => b.spent > b.limit)

      setStats({
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
        budgetAlert,
      })

      setRecentTransactions(transactions.slice(0, 5))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="container dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Total Income"
          amount={stats.totalIncome}
          color="#10b981"
          icon="💵"
        />
        <StatCard
          title="Total Expense"
          amount={stats.totalExpense}
          color="#ef4444"
          icon="💸"
        />
        <StatCard
          title="Balance"
          amount={stats.balance}
          color={stats.balance >= 0 ? '#3b82f6' : '#f97316'}
          icon="💰"
        />
        {stats.budgetAlert && (
          <StatCard
            title="Budget Alert"
            amount="Check Budget"
            color="#f59e0b"
            icon="⚠️"
          />
        )}
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  )
}

export default Dashboard
