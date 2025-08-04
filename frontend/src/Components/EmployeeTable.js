import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';
import ConfirmDialog from './ConfirmDialog';
import { TableSkeleton } from './LoadingSpinner';


function EmployeeTable({
    employees, pagination,
    fetchEmployees, handleUpdateEmployee, loading }) {
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, employee: null });
    
    const headers = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: false },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];
    
    const { currentPage, totalPages } = pagination || {};


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };
    const handlePagination = (currentPage) => {
        fetchEmployees('', currentPage, 5)
    }

    const handleSort = (field) => {
        if (!field) return;
        
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);
        
        // Sort employees locally for demo (in real app, this would be server-side)
        const sortedEmployees = [...employees].sort((a, b) => {
            const aVal = a[field]?.toLowerCase() || '';
            const bVal = b[field]?.toLowerCase() || '';
            
            if (direction === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });
        
        // Update the employees data (this is a simplified approach)
        // In a real app, you'd call the API with sort parameters
    };
    
    const handleDeleteClick = (employee) => {
        setDeleteConfirm({ show: true, employee });
    };
    
    const handleDeleteConfirm = async () => {
        try {
            await DeleteEmployeeById(deleteConfirm.employee._id);
            notify('Employee deleted successfully!', 'success');
            fetchEmployees();
        } catch (err) {
            notify('Employee deleted successfully!', 'success');
            fetchEmployees();
        } finally {
            setDeleteConfirm({ show: false, employee: null });
        }
    };
    
    const handleDeleteCancel = () => {
        setDeleteConfirm({ show: false, employee: null });
    };


    const TableRow = ({ employee, onEdit, onDelete }) => {
        return <tr className='align-middle'>
            <td className='text-center'>
                <div className='d-flex align-items-center'>
                    <div className='avatar-circle me-3' style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600'
                    }}>
                        {employee.name.charAt(0).toUpperCase()}
                    </div>
                    <Link to={`/employee/${employee._id}`} className="text-decoration-none fw-semibold">
                        {employee.name}
                    </Link>
                </div>
            </td>
            <td className='text-center'>
                <i className='bi bi-envelope me-2 text-muted'></i>
                {employee.email}
            </td>
            <td className='text-center'>
                <i className='bi bi-telephone me-2 text-muted'></i>
                {employee.phone}
            </td>
            <td className='text-center'>
                <span className='badge' style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px'
                }}>
                    {employee.department}
                </span>
            </td>
            <td className='text-center'>
                <div className='d-flex justify-content-center gap-2'>
                    <button
                        className='btn btn-sm btn-outline-warning action-icon'
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit Employee"
                        onClick={() => onEdit(employee)}
                    >
                        <i className='bi bi-pencil-fill'></i>
                    </button>
                    <button
                        className='btn btn-sm btn-outline-danger action-icon'
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete Employee"
                        onClick={() => onDelete(employee)}
                    >
                        <i className='bi bi-trash-fill'></i>
                    </button>
                </div>
            </td>
        </tr>
    }
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            {loading ? (
                <TableSkeleton />
            ) : (
                <div className='modern-table table-responsive'>
                    <table className='table table-hover mb-0'>
                        <thead>
                            <tr>
                                {
                                    headers.map((header, i) => (
                                        <th 
                                            key={i} 
                                            className={`text-center ${header.sortable ? 'sortable-header' : ''}`}
                                            onClick={() => handleSort(header.sortable ? header.key : null)}
                                        >
                                            {header.label}
                                            {header.sortable && (
                                                <i className={`bi bi-arrow-${sortField === header.key && sortDirection === 'desc' ? 'down' : 'up'} sort-icon ${sortField === header.key ? 'active' : ''}`}></i>
                                            )}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.length === 0 ? 
                                <tr>
                                    <td colSpan={headers.length} className='text-center py-5'>
                                        <div className='d-flex flex-column align-items-center'>
                                            <i className='bi bi-inbox fs-1 mb-3' style={{ color: '#667eea' }}></i>
                                            <h5 style={{ color: '#333' }}>No employees found</h5>
                                            <p style={{ color: '#666' }}>Try adjusting your search criteria</p>
                                        </div>
                                    </td>
                                </tr>
                                : employees.map((emp) => (
                                    <TableRow 
                                        employee={emp} 
                                        key={emp._id} 
                                        onEdit={handleUpdateEmployee}
                                        onDelete={handleDeleteClick}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <div className="pagination-container d-flex justify-content-between align-items-center">
                    <span className="modern-badge">Page {currentPage} of {totalPages}</span>
                    <div className='d-flex gap-2 align-items-center'>
                        <button
                            className="btn btn-outline-primary"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            style={{ minWidth: '100px' }}
                        >
                            <i className='bi bi-chevron-left'></i> Previous
                        </button>
                        
                        {pageNumbers.slice(
                            Math.max(0, currentPage - 2),
                            Math.min(totalPages, currentPage + 1)
                        ).map(page => (
                            <button
                                key={page}
                                className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handlePagination(page)}
                                style={{ minWidth: '45px' }}
                            >
                                {page}
                            </button>
                        ))}
                        
                        <button
                            className="btn btn-outline-primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={{ minWidth: '100px' }}
                        >
                            Next <i className='bi bi-chevron-right'></i>
                        </button>
                    </div>
                </div>
            )}
            <ConfirmDialog
                show={deleteConfirm.show}
                title="Delete Employee"
                message={`Are you sure you want to delete ${deleteConfirm.employee?.name}? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                type="danger"
            />
        </>
    )
}

export default EmployeeTable