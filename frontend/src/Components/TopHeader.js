import React from 'react';

const TopHeader = ({ collapsed, onToggleSidebar, currentPage, user, onSearch }) => {
    const getPageTitle = () => {
        switch (currentPage) {
            case 'dashboard': return 'Dashboard';
            case 'employees': return 'Employee Management';
            case 'departments': return 'Departments';
            case 'reports': return 'Reports';
            case 'settings': return 'Settings';
            default: return 'HR Platform';
        }
    };

    const getBreadcrumb = () => {
        switch (currentPage) {
            case 'dashboard': return 'Home / Dashboard';
            case 'employees': return 'Home / Employees';
            case 'departments': return 'Home / Departments';
            case 'reports': return 'Home / Reports';
            case 'settings': return 'Home / Settings';
            default: return 'Home';
        }
    };

    return (
        <div className="top-header">
            <div className="header-left">
                <button className="toggle-sidebar" onClick={onToggleSidebar}>
                    <i className={`bi ${collapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
                </button>
                <div>
                    <h1 className="page-title" style={{ fontSize: '20px', margin: 0 }}>{getPageTitle()}</h1>
                    <p className="breadcrumb">{getBreadcrumb()}</p>
                </div>
            </div>

            <div className="header-right">
                {currentPage === 'employees' && (
                    <div className="search-box">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Search employees..."
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </div>
                )}

                <div className="user-menu">
                    <div className="user-avatar">
                        {user?.avatar || user?.name?.charAt(0) || 'U'}
                    </div>
                    <div style={{ display: collapsed ? 'none' : 'block' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                            {user?.name || 'User'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {user?.role || 'Employee'}
                        </div>
                    </div>
                    <i className="bi bi-chevron-down" style={{ fontSize: '12px', color: '#64748b' }}></i>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;