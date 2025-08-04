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
        try {
            const { success, message } = updateMode ?
                await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);
            if (success) {
                notify(message || 'Employee saved successfully!', 'success');
                setShowModal(false);
                resetEmployeeStates();
                setUpdateMode(false);
                // Force refresh the employee list
                await fetchEmployees();
                // Trigger a page refresh for dashboard data
                window.location.reload();
            } else {
                notify(message || 'Failed to save employee', 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Network error. Please try again.', 'error');
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
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
                        <button type="button" className="btn-close" onClick={() => handleModalClose()}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddEmployee}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-person me-2 text-primary"></i>Full Name
                                    </label>
                                    <input type="text" className="form-control" name="name" value={employee.name} onChange={handleChange} required placeholder="Enter full name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-envelope me-2 text-primary"></i>Email Address
                                    </label>
                                    <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required placeholder="Enter email address" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-telephone me-2 text-primary"></i>Phone Number
                                    </label>
                                    <input type="text" className="form-control" name="phone" value={employee.phone} onChange={handleChange} required placeholder="Enter phone number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-building me-2 text-primary"></i>Department
                                    </label>
                                    <input type="text" className="form-control" name="department" value={employee.department} onChange={handleChange} required placeholder="Enter department" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-currency-dollar me-2 text-primary"></i>Salary
                                    </label>
                                    <input type="text" className="form-control" name="salary" value={employee.salary} onChange={handleChange} required placeholder="Enter salary" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <i className="bi bi-image me-2 text-primary"></i>Profile Image
                                    </label>
                                    <input type="file" className="form-control" name="profileImage" onChange={handleFileChange} accept="image/*" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline-secondary px-4" onClick={handleModalClose}>
                                    <i className="bi bi-x-circle me-2"></i>Cancel
                                </button>
                                <button type="submit" className="btn btn-primary px-4">
                                    <i className={`bi ${updateMode ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                                    {updateMode ? 'Update Employee' : 'Add Employee'}
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