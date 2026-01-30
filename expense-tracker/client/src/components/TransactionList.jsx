import './TransactionList.css'

function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="no-data">No transactions found.</p>
  }

  return (
    <div className="transaction-list">
      <div className="table-header">
        <div className="col-category">Category</div>
        <div className="col-description">Description</div>
        <div className="col-amount">Amount</div>
        <div className="col-date">Date</div>
        <div className="col-action">Action</div>
      </div>

      {transactions.map((transaction) => (
        <div key={transaction._id} className="table-row">
          <div className="col-category">{transaction.category}</div>
          <div className="col-description">{transaction.description}</div>
          <div
            className={`col-amount ${transaction.type}`}
          >
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
          </div>
          <div className="col-date">{new Date(transaction.date).toLocaleDateString()}</div>
          <div className="col-action">
            <button
              className="btn-delete"
              onClick={() => onDelete(transaction._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList
