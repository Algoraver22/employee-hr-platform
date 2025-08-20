import React, { useState } from 'react';

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [isGenerating, setIsGenerating] = useState(false);

    const reportTypes = [
        { id: 'employee-summary', name: 'Employee Summary Report', description: 'Complete overview of all employees' },
        { id: 'department-analysis', name: 'Department Analysis', description: 'Department-wise employee distribution' },
        { id: 'salary-report', name: 'Salary Report', description: 'Salary analysis and statistics' },
        { id: 'attendance-report', name: 'Attendance Report', description: 'Employee attendance tracking' },
        { id: 'performance-report', name: 'Performance Report', description: 'Employee performance metrics' }
    ];

    const recentReports = [
        { id: 1, name: 'Monthly Employee Report - December 2024', date: '2024-12-01', status: 'Completed', size: '2.3 MB' },
        { id: 2, name: 'Department Analysis Q4 2024', date: '2024-11-28', status: 'Completed', size: '1.8 MB' },
        { id: 3, name: 'Salary Report November 2024', date: '2024-11-25', status: 'Completed', size: '1.2 MB' },
        { id: 4, name: 'Attendance Summary October 2024', date: '2024-10-31', status: 'Completed', size: '950 KB' }
    ];

    const handleGenerateReport = () => {
        if (!selectedReport) {
            alert('Please select a report type');
            return;
        }

        setIsGenerating(true);
        
        // Simulate report generation
        setTimeout(() => {
            setIsGenerating(false);
            alert(`${reportTypes.find(r => r.id === selectedReport)?.name} has been generated successfully! In a real application, this would download the report file.`);
        }, 2000);
    };

    const handleDownloadReport = (reportName) => {
        alert(`Downloading ${reportName}... In a real application, this would download the actual file.`);
    };

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Reports & Analytics</h2>
                <p className="page-subtitle">Generate and download various HR reports</p>
            </div>

            {/* Report Generation */}
            <div className="modern-card" style={{ marginBottom: '30px' }}>
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="bi bi-file-earmark-text me-2"></i>
                        Generate New Report
                    </h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">Report Type</label>
                                <select 
                                    className="form-control"
                                    value={selectedReport}
                                    onChange={(e) => setSelectedReport(e.target.value)}
                                >
                                    <option value="">Select a report type</option>
                                    {reportTypes.map(report => (
                                        <option key={report.id} value={report.id}>
                                            {report.name}
                                        </option>
                                    ))}
                                </select>
                                {selectedReport && (
                                    <small className="text-muted">
                                        {reportTypes.find(r => r.id === selectedReport)?.description}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Start Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">End Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <button 
                        className="btn btn-primary"
                        onClick={handleGenerateReport}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <div className="spinner" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-download me-2"></i>
                                Generate Report
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Quick Report Cards */}
            <div className="row mb-4">
                {reportTypes.slice(0, 3).map(report => (
                    <div key={report.id} className="col-md-4 mb-3">
                        <div className="quick-action-btn h-100" onClick={() => setSelectedReport(report.id)}>
                            <div className="quick-action-icon">
                                <i className="bi bi-file-earmark-bar-graph"></i>
                            </div>
                            <h5 className="quick-action-title">{report.name}</h5>
                            <p style={{ fontSize: '14px', color: '#64748b', margin: '8px 0 0 0' }}>
                                {report.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Reports */}
            <div className="modern-card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="bi bi-clock-history me-2"></i>
                        Recent Reports
                    </h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Generated Date</th>
                                    <th>Status</th>
                                    <th>File Size</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentReports.map(report => (
                                    <tr key={report.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="stat-card-icon info me-3" style={{ width: '40px', height: '40px', fontSize: '16px' }}>
                                                    <i className="bi bi-file-earmark-pdf"></i>
                                                </div>
                                                <span className="fw-semibold">{report.name}</span>
                                            </div>
                                        </td>
                                        <td>{new Date(report.date).toLocaleDateString()}</td>
                                        <td>
                                            <span className="status-badge active">
                                                <i className="bi bi-check-circle me-1"></i>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td>{report.size}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button 
                                                    className="btn btn-sm" 
                                                    style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '6px' }}
                                                    onClick={() => handleDownloadReport(report.name)}
                                                >
                                                    <i className="bi bi-download"></i>
                                                </button>
                                                <button className="btn btn-sm" style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}>
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px' }}>
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
        </div>
    );
};

export default Reports;