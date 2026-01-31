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
        
        // Name validation - only letters, spaces, hyphens, and apostrophes
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        if (!name.trim() || name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        } else if (!nameRegex.test(name.trim())) {
            errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        } else if (name.trim().length > 50) {
            errors.name = 'Name must be less than 50 characters';
        }
        
        // Email validation - stricter regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.trim() || !emailRegex.test(email.trim())) {
            errors.email = 'Please enter a valid email address';
        } else if (email.trim().length > 100) {
            errors.email = 'Email must be less than 100 characters';
        }
        
        // Password validation - more comprehensive
        if (!password || password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        } else if (password.length > 128) {
            errors.password = 'Password must be less than 128 characters';
        } else if (!/(?=.*[a-z])/.test(password)) {
            errors.password = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(password)) {
            errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*\d)/.test(password)) {
            errors.password = 'Password must contain at least one number';
        } else if (!/(?=.*[@$!%*?&])/.test(password)) {
            errors.password = 'Password must contain at least one special character (@$!%*?&)';
        } else if (/[\s<>]/.test(password)) {
            errors.password = 'Password cannot contain spaces or angle brackets';
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
                                    // Only allow valid characters
                                    const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
                                    setName(value);
                                    if (fieldErrors.name) {
                                        setFieldErrors({...fieldErrors, name: ''});
                                    }
                                }}
                                required
                                autoComplete="name"
                                maxLength="50"
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
                                    // Convert to lowercase and trim
                                    const value = e.target.value.toLowerCase().trim();
                                    setEmail(value);
                                    if (fieldErrors.email) {
                                        setFieldErrors({...fieldErrors, email: ''});
                                    }
                                }}
                                required
                                autoComplete="email"
                                maxLength="100"
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
                                    // Remove spaces and angle brackets
                                    const value = e.target.value.replace(/[\s<>]/g, '');
                                    setPassword(value);
                                    if (fieldErrors.password) {
                                        setFieldErrors({...fieldErrors, password: ''});
                                    }
                                }}
                                required
                                autoComplete="new-password"
                                minLength="8"
                                maxLength="128"
                                title="Must contain: 8+ chars, uppercase, lowercase, number, and special character (@$!%*?&)"
                            />
                        </div>
                        <div className="password-requirements">
                            <small>Password must contain:</small>
                            <ul>
                                <li className={password.length >= 8 ? 'valid' : ''}>At least 8 characters</li>
                                <li className={/(?=.*[a-z])/.test(password) ? 'valid' : ''}>One lowercase letter</li>
                                <li className={/(?=.*[A-Z])/.test(password) ? 'valid' : ''}>One uppercase letter</li>
                                <li className={/(?=.*\d)/.test(password) ? 'valid' : ''}>One number</li>
                                <li className={/(?=.*[@$!%*?&])/.test(password) ? 'valid' : ''}>One special character (@$!%*?&)</li>
                            </ul>
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
                                    // Remove spaces and angle brackets
                                    const value = e.target.value.replace(/[\s<>]/g, '');
                                    setConfirmPassword(value);
                                    if (fieldErrors.confirmPassword) {
                                        setFieldErrors({...fieldErrors, confirmPassword: ''});
                                    }
                                }}
                                required
                                autoComplete="new-password"
                                minLength="8"
                                maxLength="128"
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
