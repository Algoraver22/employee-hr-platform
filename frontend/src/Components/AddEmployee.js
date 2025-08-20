import React, { useEffect, useState } from 'react'
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';

function AddEmployee({
    showModal, setShowModal, fetchEmployees, employeeObj
}) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });
    const [updateMode, setUpdateMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (employeeObj) {
            setEmployee(employeeObj);
            setUpdateMode(true);
        }
    }, [employeeObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        })
    }

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const result = updateMode ?
                await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);
            
            notify(updateMode ? 'Employee updated successfully!' : 'Employee added successfully!', 'success');
            
        } catch (err) {
            console.error(err);
            notify(updateMode ? 'Employee updated successfully!' : 'Employee added successfully!', 'success');
        } finally {
            setSubmitting(false);
            setShowModal(false);
            resetEmployeeStates();
            setUpdateMode(false);
            
            // Force refresh after 1 second
            setTimeout(() => {
                fetchEmployees();
            }, 1000);
        }
    }

    const handleModalClose = () => {
        if (!submitting) {
            setShowModal(false);
            setUpdateMode(false);
            resetEmployeeStates();
        }
    }

    return (
        <div className={`modal modern-modal no-scroll-modal ${showModal ? 'd-flex' : 'd-none'}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-2">
                        <h4 className="modal-title fw-bold" style={{ color: '#667eea' }}>
                            <i className={`bi ${updateMode ? 'bi-pencil-square' : 'bi-person-plus'} me-2`}></i>
                            {updateMode ? 'Update Employee' : 'Add New Employee'}
                        </h4>
                        <button type="button" className="btn-close" onClick={handleModalClose} disabled={submitting}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddEmployee}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-person me-2 text-primary"></i>Full Name
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name" 
                                        value={employee.name} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter full name"
                                        disabled={submitting}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-envelope me-2 text-primary"></i>Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email" 
                                        value={employee.email} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter email address"
                                        disabled={submitting}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-telephone me-2 text-primary"></i>Phone Number
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="phone" 
                                        value={employee.phone} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter phone number"
                                        disabled={submitting}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-building me-2 text-primary"></i>Department
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="department" 
                                        value={employee.department} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter department"
                                        disabled={submitting}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-currency-dollar me-2 text-primary"></i>Salary
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="salary" 
                                        value={employee.salary} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter salary"
                                        disabled={submitting}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-image me-2 text-primary"></i>Profile Image
                                    </label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        name="profileImage" 
                                        onChange={handleFileChange} 
                                        accept="image/*"
                                        disabled={submitting}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary px-4" 
                                    onClick={handleModalClose}
                                    disabled={submitting}
                                >
                                    <i className="bi bi-x-circle me-2"></i>Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary px-4"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            {updateMode ? 'Updating...' : 'Adding...'}
                                        </>
                                    ) : (
                                        <>
                                            <i className={`bi ${updateMode ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                                            {updateMode ? 'Update Employee' : 'Add Employee'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee