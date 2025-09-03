import React, { useState, useEffect } from 'react';
import { notify } from '../utils';

const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        leaveType: 'annual',
        startDate: '',
        endDate: '',
        reason: '',
        status: 'pending'
    });

    const leaveTypes = [
        { value: 'annual', label: 'Annual Leave' },
        { value: 'sick', label: 'Sick Leave' },
        { value: 'maternity', label: 'Maternity Leave' },
        { value: 'emergency', label: 'Emergency Leave' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const newLeave = {
                id: Date.now(),
                ...formData,
                appliedDate: new Date().toISOString().split('T')[0],
                days: calculateDays(formData.startDate, formData.endDate)
            };
            
            setLeaves(prev => [newLeave, ...prev]);
            setShowModal(false);
            setFormData({
                employeeId: '',
                leaveType: 'annual',
                startDate: '',
                endDate: '',
                reason: '',
                status: 'pending'
            });
            notify('Leave application submitted successfully', 'success');
        } catch (error) {
            notify('Failed to submit leave application', 'error');
        } finally {
            setLoading(false);
        }
    };

    const calculateDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const handleStatusChange = (leaveId, newStatus) => {
        setLeaves(prev => prev.map(leave => 
            leave.id === leaveId ? { ...leave, status: newStatus } : leave
        ));
        notify(`Leave ${newStatus} successfully`, 'success');
    };

    return (
        <div className="leave-management">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="page-title">Leave Management</h2>
                    <p className="page-subtitle">Manage employee leave requests</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Apply Leave
                </button>
            </div>

            <div className="table-container">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Days</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map(leave => (
                                <tr key={leave.id}>
                                    <td>{leave.employeeId}</td>
                                    <td>
                                        <span className="modern-badge">
                                            {leaveTypes.find(t => t.value === leave.leaveType)?.label}
                                        </span>
                                    </td>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                    <td>{leave.days}</td>
                                    <td>
                                        <span className={`status-badge ${leave.status}`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td>
                                        {leave.status === 'pending' && (
                                            <div className="d-flex gap-2">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleStatusChange(leave.id, 'approved')}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleStatusChange(leave.id, 'rejected')}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal show">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Apply for Leave</h5>
                                <button 
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-row">
                                        <div className="form-col">
                                            <label className="form-label">Employee ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.employeeId}
                                                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-col">
                                            <label className="form-label">Leave Type</label>
                                            <select
                                                className="form-control"
                                                value={formData.leaveType}
                                                onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                                            >
                                                {leaveTypes.map(type => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-col">
                                            <label className="form-label">Start Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-col">
                                            <label className="form-label">End Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={formData.endDate}
                                                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-col">
                                        <label className="form-label">Reason</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={formData.reason}
                                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveManagement;