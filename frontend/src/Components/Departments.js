import React, { useState } from 'react';

const Departments = () => {
    const [departments, setDepartments] = useState([
        { id: 1, name: 'Human Resources', employees: 12, manager: 'Sarah Johnson', budget: '$250,000' },
        { id: 2, name: 'Engineering', employees: 45, manager: 'Mike Chen', budget: '$1,200,000' },
        { id: 3, name: 'Marketing', employees: 18, manager: 'Emily Davis', budget: '$400,000' },
        { id: 4, name: 'Sales', employees: 32, manager: 'Robert Wilson', budget: '$800,000' },
        { id: 5, name: 'Finance', employees: 8, manager: 'Lisa Anderson', budget: '$300,000' }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newDepartment, setNewDepartment] = useState({ name: '', manager: '', budget: '' });

    const handleAddDepartment = () => {
        if (newDepartment.name && newDepartment.manager && newDepartment.budget) {
            const newDept = {
                id: departments.length + 1,
                name: newDepartment.name,
                employees: 0,
                manager: newDepartment.manager,
                budget: newDepartment.budget
            };
            setDepartments([...departments, newDept]);
            setNewDepartment({ name: '', manager: '', budget: '' });
            setShowAddModal(false);
        }
    };

    const handleDeleteDepartment = (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            setDepartments(departments.filter(dept => dept.id !== id));
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Department Management</h2>
                <p className="page-subtitle">Manage organizational departments and their details</p>
            </div>

            {/* Department Statistics */}
            <div className="stats-grid" style={{ marginBottom: '30px' }}>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <h3 className="stat-card-title">Total Departments</h3>
                        <div className="stat-card-icon primary">
                            <i className="bi bi-building"></i>
                        </div>
                    </div>
                    <h2 className="stat-card-value">{departments.length}</h2>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <h3 className="stat-card-title">Total Employees</h3>
                        <div className="stat-card-icon success">
                            <i className="bi bi-people"></i>
                        </div>
                    </div>
                    <h2 className="stat-card-value">{departments.reduce((sum, dept) => sum + dept.employees, 0)}</h2>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <h3 className="stat-card-title">Total Budget</h3>
                        <div className="stat-card-icon warning">
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                    </div>
                    <h2 className="stat-card-value">$2.95M</h2>
                </div>
            </div>

            {/* Departments Table */}
            <div className="modern-card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="bi bi-building me-2"></i>
                        Departments Directory
                    </h3>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Department
                    </button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Department Name</th>
                                    <th>Manager</th>
                                    <th>Employees</th>
                                    <th>Budget</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map(dept => (
                                    <tr key={dept.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="stat-card-icon primary me-3" style={{ width: '40px', height: '40px', fontSize: '16px' }}>
                                                    <i className="bi bi-building"></i>
                                                </div>
                                                <span className="fw-semibold">{dept.name}</span>
                                            </div>
                                        </td>
                                        <td>{dept.manager}</td>
                                        <td>
                                            <span className="modern-badge">{dept.employees}</span>
                                        </td>
                                        <td className="fw-semibold">{dept.budget}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm" style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px' }}>
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm" 
                                                    style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px' }}
                                                    onClick={() => handleDeleteDepartment(dept.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Department Modal */}
            {showAddModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Department</h5>
                                <button 
                                    className="btn-close" 
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label className="form-label">Department Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newDepartment.name}
                                        onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                                        placeholder="Enter department name"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Manager</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newDepartment.manager}
                                        onChange={(e) => setNewDepartment({...newDepartment, manager: e.target.value})}
                                        placeholder="Enter manager name"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Budget</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newDepartment.budget}
                                        onChange={(e) => setNewDepartment({...newDepartment, budget: e.target.value})}
                                        placeholder="e.g., $500,000"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="btn btn-primary"
                                    onClick={handleAddDepartment}
                                >
                                    Add Department
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Departments;