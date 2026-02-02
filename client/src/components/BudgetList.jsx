import './BudgetList.css'

function BudgetList({ budgets, onDelete }) {
  if (budgets.length === 0) {
    return <p className="no-data">No budgets set yet.</p>
  }

  return (
    <div className="budget-list">
      {budgets.map((budget) => (
        <div key={budget.id || budget._id} className="budget-card">
          <div className="budget-header">
            <h3>{budget.category}</h3>
            <button
              className="btn-delete"
              onClick={() => onDelete(budget.id || budget._id)}
            >
              Delete
            </button>
          </div>

          <div className="budget-details">
            <div className="detail-item">
              <span>Limit:</span>
              <p>${(budget.amount || budget.limit).toFixed(2)}</p>
            </div>
            <div className="detail-item">
              <span>Spent:</span>
              <p>${budget.spent.toFixed(2)}</p>
            </div>
            <div className="detail-item">
              <span>Remaining:</span>
              <p className={budget.remaining >= 0 ? 'positive' : 'negative'}>
                ${budget.remaining.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className={`progress-fill ${budget.percentage > 100 ? 'over' : 'normal'}`}
                style={{ width: `${Math.min(budget.percentage, 100)}%` }}
              />
            </div>
            <p className="progress-text">{budget.percentage.toFixed(0)}% spent</p>
          </div>

          {budget.percentage > 90 && (
            <p className="warning-message">⚠️ You've used most of your budget!</p>
          )}
          {budget.percentage > 100 && (
            <p className="error-message">❌ Budget exceeded!</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default BudgetList
