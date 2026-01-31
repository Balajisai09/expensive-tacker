import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, PiggyBank, TrendingUp, Shield, Users } from 'lucide-react'
import './Landing.css'

function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <nav className="landing-nav">
          <div className="nav-brand">
            💰 Expense Tracker
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Take Control of Your 
              <span className="gradient-text"> Finances</span>
            </h1>
            <p className="hero-description">
              Track expenses, manage budgets, and gain insights into your spending habits with our powerful and intuitive expense tracker.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Sign In
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="card-title">Monthly Overview</div>
              </div>
              <div className="card-content">
                <div className="stat-row">
                  <span>Income</span>
                  <span className="stat-positive">+$5,240</span>
                </div>
                <div className="stat-row">
                  <span>Expenses</span>
                  <span className="stat-negative">-$3,180</span>
                </div>
                <div className="stat-row total">
                  <span>Savings</span>
                  <span className="stat-total">+$2,060</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="section-header">
            <h2>Powerful Features</h2>
            <p>Everything you need to manage your finances effectively</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={32} />
              </div>
              <h3>Smart Analytics</h3>
              <p>Get detailed insights into your spending patterns with beautiful charts and reports.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <PiggyBank size={32} />
              </div>
              <h3>Budget Management</h3>
              <p>Set budgets for different categories and track your progress in real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Expense Tracking</h3>
              <p>Easily log and categorize your expenses to see where your money goes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Secure & Private</h3>
              <p>Your financial data is encrypted and kept secure with enterprise-grade protection.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Multi-Device</h3>
              <p>Access your finances from anywhere, on any device with cloud sync.</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-content">
            <h2>Ready to Transform Your Financial Future?</h2>
            <p>Join thousands of users who have already taken control of their finances.</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-brand">
              💰 Expense Tracker
            </div>
            <div className="footer-text">
              © 2024 Expense Tracker. Built with ❤️ for better financial management.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Landing
