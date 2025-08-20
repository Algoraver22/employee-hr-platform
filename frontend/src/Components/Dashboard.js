import React, { useState, useEffect } from 'react';

const Dashboard = ({ employeesData }) => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        departments: {},
        avgSalary: 0,
        recentHires: 0,
        activeEmployees: 0
    });

    useEffect(() => {
        if (employeesData?.employees) {
            calculateStats(employeesData.employees);
        }
    }, [employeesData]);

    const calculateStats = (employees) => {
        const departments = {};
        let totalSalary = 0;
        let recentHires = 0;
        let activeEmployees = 0;

        employees.forEach(emp => {
            departments[emp.department] = (departments[emp.department] || 0) + 1;
            totalSalary += parseFloat(emp.salary || 0);
            activeEmployees++;
            
            // Simulate recent hires
            if (Math.random() > 0.7) recentHires++;
        });

        setStats({
            totalEmployees: employees.length,
            departments,
            avgSalary: employees.length ? Math.round(totalSalary / employees.length) : 0,
            recentHires,
            activeEmployees
        });
    };

    const StatCard = ({ icon, title, value, iconClass, trend, trendPositive = true }) => (
        <div className="stat-card">
            <div className="stat-card-header">
                <h3 className="stat-card-title">{title}</h3>
                <div className={`stat-card-icon ${iconClass}`}>
                    <i className={`bi ${icon}`}></i>
                </div>
            </div>
            <h2 className="stat-card-value">{value}</h2>
            {trend && (
                <div className={`stat-card-change ${trendPositive ? 'positive' : 'negative'}`}>
                    <i className={`bi ${trendPositive ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
                    {trend} from last month
                </div>
            )}
        </div>
    );

    const QuickActionCard = ({ icon, title, onClick }) => (
        <div className="quick-action-btn" onClick={onClick}>
            <div className="quick-action-icon">
                <i className={`bi ${icon}`}></i>
            </div>
            <h4 className="quick-action-title">{title}</h4>
        </div>
    );

    const handleQuickAction = (action) => {
        switch(action) {
            case 'add-employee':
                // This will be handled by parent component
                if (window.handleAddEmployee) {
                    window.handleAddEmployee();
                } else {
                    alert('Add Employee functionality will open the employee form');
                }
                break;
            case 'generate-report':
                alert('Generating employee report... This feature will export employee data to PDF/Excel');
                break;
            case 'schedule-meeting':
                alert('Opening meeting scheduler... This will integrate with calendar systems');
                break;
            case 'settings':
                alert('Opening settings panel... This will allow system configuration');
                break;
            default:
                console.log('Quick action:', action);
        }
    };


    return (
        <div className="dashboard-container">
            {/* Statistics Cards */}
            <div className="stats-grid">
                <StatCard 
                    icon="bi-people-fill" 
                    title="Total Employees" 
                    value={stats.totalEmployees}
                    iconClass="primary"
                    trend="+12%"
                />
                <StatCard 
                    icon="bi-person-check-fill" 
                    title="Active Employees" 
                    value={stats.activeEmployees}
                    iconClass="success"
                    trend="+8%"
                />
                <StatCard 
                    icon="bi-building-fill" 
                    title="Departments" 
                    value={Object.keys(stats.departments).length}
                    iconClass="info"
                    trend="+2"
                />
                <StatCard 
                    icon="bi-person-plus-fill" 
                    title="New Hires" 
                    value={stats.recentHires}
                    iconClass="warning"
                    trend="+15%"
                />
            </div>

            {/* Quick Actions */}
            <div className="modern-card" style={{ marginBottom: '24px' }}>
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="bi bi-lightning-fill me-2"></i>
                        Quick Actions
                    </h3>
                </div>
                <div className="card-body">
                    <div className="quick-actions">
                        <QuickActionCard 
                            icon="bi-person-plus-fill" 
                            title="Add Employee" 
                            onClick={() => handleQuickAction('add-employee')}
                        />
                        <QuickActionCard 
                            icon="bi-file-earmark-text" 
                            title="Generate Report" 
                            onClick={() => handleQuickAction('generate-report')}
                        />
                        <QuickActionCard 
                            icon="bi-calendar-event" 
                            title="Schedule Meeting" 
                            onClick={() => handleQuickAction('schedule-meeting')}
                        />
                        <QuickActionCard 
                            icon="bi-gear" 
                            title="Settings" 
                            onClick={() => handleQuickAction('settings')}
                        />
                    </div>
                </div>
            </div>
            {/* Charts and Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Department Distribution */}
                <div className="modern-card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <i className="bi bi-pie-chart-fill me-2"></i>
                            Department Distribution
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="department-chart">
                            {Object.entries(stats.departments).map(([dept, count], index) => (
                                <div key={dept} className="d-flex justify-content-between align-items-center mb-3 p-3" 
                                     style={{ background: '#f8fafc', borderRadius: '8px' }}>
                                    <div className="d-flex align-items-center">
                                        <div 
                                            style={{ 
                                                backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                marginRight: '12px'
                                            }}
                                        ></div>
                                        <span style={{ fontWeight: '500', color: '#1e293b' }}>{dept}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span style={{ fontWeight: '600', color: '#1e293b', marginRight: '12px' }}>{count}</span>
                                        <div style={{
                                            width: '60px',
                                            height: '6px',
                                            backgroundColor: '#e2e8f0',
                                            borderRadius: '3px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${(count / stats.totalEmployees) * 100}%`,
                                                height: '100%',
                                                backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                                                borderRadius: '3px'
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="modern-card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <i className="bi bi-activity me-2"></i>
                            Recent Activity
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="activity-list">
                            {[
                                { icon: 'bi-person-plus', text: 'New employee John Doe added', time: '2 hours ago', color: '#10b981' },
                                { icon: 'bi-pencil', text: 'Employee profile updated', time: '5 hours ago', color: '#3b82f6' },
                                { icon: 'bi-file-text', text: 'Monthly report generated', time: '1 day ago', color: '#f59e0b' },
                                { icon: 'bi-graph-up', text: 'Analytics dashboard updated', time: '2 days ago', color: '#8b5cf6' }
                            ].map((activity, index) => (
                                <div key={index} className="d-flex align-items-center mb-3 p-3" 
                                     style={{ background: '#f8fafc', borderRadius: '8px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: activity.color,
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '12px'
                                    }}>
                                        <i className={`bi ${activity.icon}`} style={{ color: 'white' }}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p style={{ margin: 0, fontWeight: '500', color: '#1e293b' }}>{activity.text}</p>
                                        <small style={{ color: '#64748b' }}>{activity.time}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;