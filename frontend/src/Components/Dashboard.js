import React, { useState, useEffect } from 'react';
import { GetAllEmployees } from '../api';

const Dashboard = ({ employeesData }) => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        departments: {},
        avgSalary: 0,
        recentHires: 0
    });

    useEffect(() => {
        if (employeesData?.employees) {
            calculateStats(employeesData.employees);
        }
    }, [employeesData]);
    
    // Force refresh dashboard data
    useEffect(() => {
        const refreshDashboard = () => {
            if (employeesData?.employees) {
                calculateStats(employeesData.employees);
            }
        };
        
        // Listen for custom refresh events
        window.addEventListener('dashboardRefresh', refreshDashboard);
        return () => window.removeEventListener('dashboardRefresh', refreshDashboard);
    }, [employeesData]);

    const calculateStats = (employees) => {
        const departments = {};
        let totalSalary = 0;
        let recentHires = 0;
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        employees.forEach(emp => {
            departments[emp.department] = (departments[emp.department] || 0) + 1;
            totalSalary += parseFloat(emp.salary || 0);
            
            // Simulate recent hires (you can add createdAt field to your backend)
            if (Math.random() > 0.7) recentHires++;
        });

        setStats({
            totalEmployees: employees.length,
            departments,
            avgSalary: employees.length ? Math.round(totalSalary / employees.length) : 0,
            recentHires
        });
    };

    const StatCard = ({ icon, title, value, color, trend }) => (
        <div className="d-flex justify-content-between align-items-start">
            <div>
                <div className={`stat-icon ${color} mb-3`}>
                    <i className={`bi ${icon} fs-3`}></i>
                </div>
                <h3 className="stat-value mb-1" style={{ color: '#2c3e50' }}>{value}</h3>
                <p className="stat-title mb-0" style={{ color: '#34495e' }}>{title}</p>
            </div>
            {trend && (
                <div className="stat-trend">
                    <i className="bi bi-arrow-up text-success"></i>
                    <span className="text-success small fw-bold">{trend}</span>
                </div>
            )}
        </div>
    );

    // Trigger dashboard refresh
    const triggerRefresh = async () => {
        try {
            // Re-fetch fresh data
            const { GetAllEmployees } = await import('../api');
            const freshData = await GetAllEmployees('', 1, 100);
            if (freshData && freshData.employees) {
                calculateStats(freshData.employees);
            }
        } catch (err) {
            console.error('Refresh error:', err);
        }
    };
    
    return (
        <div className="dashboard-container mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-white mb-0">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard Overview
                </h4>
                <button className="btn btn-outline-light btn-sm" onClick={triggerRefresh}>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh Data
                </button>
            </div>
            
            {(!employeesData?.employees || employeesData.employees.length === 0) && (
                <div className="alert alert-info text-center mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    Dashboard data is loading. If this persists, the backend server may be starting up. Please wait a moment and click "Refresh Data".
                </div>
            )}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="stat-card stat-card-1 glass-card p-4">
                        <StatCard 
                            icon="bi-people-fill" 
                            title="Total Employees" 
                            value={stats.totalEmployees}
                            color="text-white"
                            trend="+12%"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card stat-card-2 glass-card p-4">
                        <StatCard 
                            icon="bi-building-fill" 
                            title="Departments" 
                            value={Object.keys(stats.departments).length}
                            color="text-white"
                            trend="+2"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card stat-card-3 glass-card p-4">
                        <StatCard 
                            icon="bi-currency-dollar" 
                            title="Avg Salary" 
                            value={`$${stats.avgSalary.toLocaleString()}`}
                            color="text-white"
                            trend="+5%"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card stat-card-4 glass-card p-4">
                        <StatCard 
                            icon="bi-person-plus-fill" 
                            title="Recent Hires" 
                            value={stats.recentHires}
                            color="text-white"
                            trend="+3"
                        />
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="chart-card glass-card p-4">
                        <h5 className="chart-title mb-4 text-white">
                            <i className="bi bi-pie-chart-fill me-2"></i>
                            Department Distribution
                        </h5>
                        <div className="department-chart">
                            {Object.entries(stats.departments).map(([dept, count], index) => (
                                <div key={dept} className="department-item d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div 
                                            className="department-color me-3"
                                            style={{ 
                                                backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%'
                                            }}
                                        ></div>
                                        <span className="text-white">{dept}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="text-white me-2">{count}</span>
                                        <div 
                                            className="progress-bar-mini"
                                            style={{
                                                width: '60px',
                                                height: '6px',
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                borderRadius: '3px',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div 
                                                style={{
                                                    width: `${(count / stats.totalEmployees) * 100}%`,
                                                    height: '100%',
                                                    backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                                                    borderRadius: '3px'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="activity-card glass-card p-4">
                        <h5 className="chart-title mb-4 text-white">
                            <i className="bi bi-activity me-2"></i>
                            Recent Activity
                        </h5>
                        <div className="activity-list">
                            <div className="activity-item d-flex align-items-center mb-3">
                                <div className="activity-icon bg-success me-3">
                                    <i className="bi bi-person-plus text-white"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <p className="mb-0 text-white">New employee added</p>
                                    <small className="text-light opacity-75">2 hours ago</small>
                                </div>
                            </div>
                            <div className="activity-item d-flex align-items-center mb-3">
                                <div className="activity-icon bg-primary me-3">
                                    <i className="bi bi-pencil text-white"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <p className="mb-0 text-white">Employee profile updated</p>
                                    <small className="text-light opacity-75">5 hours ago</small>
                                </div>
                            </div>
                            <div className="activity-item d-flex align-items-center mb-3">
                                <div className="activity-icon bg-warning me-3">
                                    <i className="bi bi-file-text text-white"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <p className="mb-0 text-white">Monthly report generated</p>
                                    <small className="text-light opacity-75">1 day ago</small>
                                </div>
                            </div>
                            <div className="activity-item d-flex align-items-center">
                                <div className="activity-icon bg-info me-3">
                                    <i className="bi bi-graph-up text-white"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <p className="mb-0 text-white">Analytics updated</p>
                                    <small className="text-light opacity-75">2 days ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;