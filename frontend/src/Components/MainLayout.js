import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import Dashboard from './Dashboard';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import LoadingSpinner from './LoadingSpinner';
import Departments from './Departments';
import Reports from './Reports';
import Settings from './Settings';
import { GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';

const MainLayout = ({ user, onLogout }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null);
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 100) => {
        setLoading(true);
        try {
            const data = await GetAllEmployees(search, page, limit);
            if (data && data.employees && Array.isArray(data.employees)) {
                setEmployeesData(data);
            } else {
                setEmployeesData({
                    employees: [],
                    pagination: {
                        currentPage: 1,
                        pageSize: 100,
                        totalEmployees: 0,
                        totalPages: 0
                    }
                });
            }
        } catch (err) {
            console.error('Fetch error:', err);
            notify('Failed to fetch employees', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        fetchEmployees(searchTerm);
    };

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    };

    const handleNavigation = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            if (page === 'dashboard' || page === 'employees') {
                fetchEmployees();
            }
        }
    };

    // Set up global function for quick actions
    useEffect(() => {
        window.handleAddEmployee = () => {
            setShowModal(true);
        };
        return () => {
            delete window.handleAddEmployee;
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Initial load
    useEffect(() => {
        fetchEmployees();
    }, []);

    const renderContent = () => {
        switch (currentPage) {
            case 'dashboard':
                return loading ? (
                    <LoadingSpinner message="Loading dashboard..." />
                ) : (
                    <Dashboard employeesData={employeesData} />
                );
            
            case 'employees':
                return loading ? (
                    <LoadingSpinner message="Loading employees..." />
                ) : (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="page-title">Employee Management</h2>
                                <p className="page-subtitle">Manage your organization's workforce</p>
                            </div>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setShowModal(true)}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add Employee
                            </button>
                        </div>
                        <EmployeeTable
                            employees={employeesData.employees}
                            pagination={employeesData.pagination}
                            fetchEmployees={fetchEmployees}
                            handleUpdateEmployee={handleUpdateEmployee}
                            loading={loading}
                        />
                    </div>
                );
            
            case 'departments':
                return <Departments />;
            
            case 'reports':
                return <Reports />;
            
            case 'settings':
                return <Settings />;
            
            default:
                return <Dashboard employeesData={employeesData} />;
        }
    };

    return (
        <div className="app-layout">
            <Sidebar 
                collapsed={sidebarCollapsed}
                currentPage={currentPage}
                onNavigate={handleNavigation}
                onToggle={toggleSidebar}
            />
            
            <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
                <TopHeader 
                    collapsed={sidebarCollapsed}
                    onToggleSidebar={toggleSidebar}
                    currentPage={currentPage}
                    user={user}
                    onSearch={currentPage === 'employees' ? handleSearch : null}
                />
                
                <div className="content-area">
                    {renderContent()}
                </div>
            </div>

            <AddEmployee
                fetchEmployees={fetchEmployees}
                showModal={showModal}
                setShowModal={setShowModal}
                employeeObj={employeeObj}
            />

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                theme="colored"
            />
        </div>
    );
};

export default MainLayout;