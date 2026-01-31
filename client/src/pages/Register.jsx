import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { authAPI } from '../services/api';
import './Auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        
        if (!name.trim() || name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!password || password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);

        try {
            const { data } = await authAPI.register({ name, email, password });

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to dashboard
            navigate('/dashboard');
            window.location.reload(); // Refresh to update app state
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">
                <div className="auth-header">
                    <span className="auth-logo">🚀</span>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Start tracking your expenses like a pro today</p>
                </div>

                {error && (
                    <div className="auth-error" style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.5)',
                        color: '#fca5a5',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <div className="form-input-wrapper">
                            <User className="form-icon" size={20} />
                            <input
                                type="text"
                                id="name"
                                className={`form-input ${fieldErrors.name ? 'error' : ''}`}
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (fieldErrors.name) {
                                        setFieldErrors({...fieldErrors, name: ''});
                                    }
                                }}
                                required
                                autoComplete="name"
                            />
                        </div>
                        {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="form-input-wrapper">
                            <Mail className="form-icon" size={20} />
                            <input
                                type="email"
                                id="email"
                                className={`form-input ${fieldErrors.email ? 'error' : ''}`}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (fieldErrors.email) {
                                        setFieldErrors({...fieldErrors, email: ''});
                                    }
                                }}
                                required
                                autoComplete="email"
                            />
                        </div>
                        {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="form-input-wrapper">
                            <Lock className="form-icon" size={20} />
                            <input
                                type="password"
                                id="password"
                                className={`form-input ${fieldErrors.password ? 'error' : ''}`}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (fieldErrors.password) {
                                        setFieldErrors({...fieldErrors, password: ''});
                                    }
                                }}
                                required
                                autoComplete="new-password"
                                minLength="6"
                            />
                        </div>
                        {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="form-input-wrapper">
                            <Lock className="form-icon" size={20} />
                            <input
                                type="password"
                                id="confirmPassword"
                                className={`form-input ${fieldErrors.confirmPassword ? 'error' : ''}`}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (fieldErrors.confirmPassword) {
                                        setFieldErrors({...fieldErrors, confirmPassword: ''});
                                    }
                                }}
                                required
                                autoComplete="new-password"
                                minLength="6"
                            />
                        </div>
                        {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                            <>Create Account <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} /></>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?
                    <Link to="/login" className="auth-link">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
