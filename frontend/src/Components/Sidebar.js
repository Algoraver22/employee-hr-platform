import React from 'react';

const Sidebar = ({ collapsed, currentPage, onNavigate, onToggle }) => {
    const menuItems = [
        { id: 'dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
        { id: 'employees', icon: 'bi-people-fill', label: 'Employees' },
        { id: 'departments', icon: 'bi-building', label: 'Departments' },
        { id: 'reports', icon: 'bi-graph-up', label: 'Reports' },
        { id: 'settings', icon: 'bi-gear', label: 'Settings' }
    ];

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <i className="bi bi-building"></i>
                </div>
                {!collapsed && <h2 className="sidebar-title">HR Platform</h2>}
            </div>

            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <i className={`bi ${item.icon}`}></i>
                        {!collapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            <div style={{ position: 'absolute', bottom: '20px', width: '100%', padding: '0 20px' }}>
                <button
                    className="nav-item"
                    onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}
                >
                    <i className="bi bi-box-arrow-right"></i>
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;