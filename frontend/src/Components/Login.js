import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call - replace with actual authentication
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock authentication - replace with real JWT validation
            if (formData.email && formData.password) {
                const userData = {
                    id: 1,
                    name: 'Admin User',
                    email: formData.email,
                    role: 'admin',
                    avatar: 'AU'
                };
                
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', 'mock-jwt-token');
                
                onLogin(userData);
                notify('Login successful!', 'success');
                navigate('/dashboard');
            } else {
                notify('Please enter valid credentials', 'error');
            }
        } catch (error) {
            notify('Login failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <i className="bi bi-building"></i>
                    </div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="auth-link">
                    Don't have an account? <a href="#register">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;