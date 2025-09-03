import React, { useState, useEffect } from 'react';
import Login from './Login';
import MainLayout from './MainLayout';
import ErrorBoundary from './ErrorBoundary';
import LoadingFallback from './LoadingFallback';

const SimpleApp = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [renderKey, setRenderKey] = useState(0);

    useEffect(() => {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (savedUser && token) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        // Force re-render after login
        setTimeout(() => {
            setRenderKey(prev => prev + 1);
        }, 100);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <ErrorBoundary>
                <Login onLogin={handleLogin} />
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary key={renderKey}>
            <LoadingFallback>
                <MainLayout user={user} onLogout={handleLogout} />
            </LoadingFallback>
        </ErrorBoundary>
    );
};

export default SimpleApp;