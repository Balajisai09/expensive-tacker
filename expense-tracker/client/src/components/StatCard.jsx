import './StatCard.css'

function StatCard({ title, amount, color, icon }) {
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <p className="stat-amount" style={{ color }}>
          {typeof amount === 'number' ? `$${amount.toFixed(2)}` : amount}
        </p>
      </div>
    </div>
  )
}

export default StatCard
