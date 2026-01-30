import './RecentTransactions.css'

function RecentTransactions({ transactions }) {
  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="transaction-item">
              <div className="transaction-info">
                <p className="transaction-category">{transaction.category}</p>
                <p className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <p
                className={`transaction-amount ${transaction.type}`}
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentTransactions
