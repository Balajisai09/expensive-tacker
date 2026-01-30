import { useState, useEffect } from 'react'
import { reportsAPI } from '../services/api'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './Reports.css'

function Reports() {
  const [summary, setSummary] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [trendData, setTrendData] = useState([])
  const [expenseVsIncomeData, setExpenseVsIncomeData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const [
        summaryRes,
        categoryRes,
        trendRes,
        expenseVsIncomeRes,
      ] = await Promise.all([
        reportsAPI.getSummary('month'),
        reportsAPI.getCategoryBreakdown(),
        reportsAPI.getMonthlyTrend(),
        reportsAPI.getExpenseVsIncome(),
      ])

      setSummary(summaryRes.data)
      setCategoryData(categoryRes.data || [])
      setTrendData(trendRes.data || [])
      setExpenseVsIncomeData(expenseVsIncomeRes.data || [])
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

  return (
    <div className="container reports-page">
      <h1>Financial Reports</h1>

      <div className="reports-grid">
        <div className="report-card">
          <h2>Expense by Category</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="report-card">
          <h2>Monthly Trend</h2>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="report-card">
          <h2>Expense vs Income</h2>
          {expenseVsIncomeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseVsIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expense" fill="#ef4444" />
                <Bar dataKey="income" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      {summary && (
        <div className="summary-section">
          <h2>Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <span>Total Income</span>
              <p>${summary.income || 0}</p>
            </div>
            <div className="summary-item">
              <span>Total Expense</span>
              <p>${summary.expense || 0}</p>
            </div>
            <div className="summary-item">
              <span>Balance</span>
              <p>${(summary.income || 0) - (summary.expense || 0)}</p>
            </div>
            <div className="summary-item">
              <span>Savings Rate</span>
              <p>
                {summary.income > 0
                  ? (
                      (((summary.income || 0) - (summary.expense || 0)) /
                        (summary.income || 1)) *
                      100
                    ).toFixed(2) + '%'
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
