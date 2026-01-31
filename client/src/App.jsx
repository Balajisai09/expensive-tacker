import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Background3D from './components/Background3D'
import ProtectedRoute from './components/ProtectedRoute'
import { authAPI } from './services/api'
import './App.css'

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="app">
      <Background3D />

      {!isAuthPage && (
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              💰 Expense Tracker
            </Link>
            <ul className="nav-menu">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/transactions" className="nav-link">Transactions</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/budget" className="nav-link">Budget</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/reports" className="nav-link">Reports</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">Settings</Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link logout-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}

      <main className={!isAuthPage ? "main-content" : ""} style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
