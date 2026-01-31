import { useState } from 'react'
import './BudgetForm.css'

function BudgetForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    month: new Date().toISOString().slice(0, 7),
  })

  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      limit: parseFloat(formData.limit),
    })
    setFormData({
      category: '',
      limit: '',
      month: new Date().toISOString().slice(0, 7),
    })
  }

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Budget Limit</label>
        <input
          type="number"
          name="limit"
          value={formData.limit}
          onChange={handleChange}
          placeholder="0.00"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Month</label>
        <input
          type="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create Budget
      </button>
    </form>
  )
}

export default BudgetForm
