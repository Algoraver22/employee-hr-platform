import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';


const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null)
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees')
        try {
            const data =
                await GetAllEmployees(search, page, limit);
            console.log(data);
            setEmployeesData(data);
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, [])


    const handleSearch = (e) => {
        fetchEmployees(e.target.value)
    }

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    }
    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <h1 style={{
    //   backgroundColor: '#fff3f0',             // soft coral background
      color: '#2ecc71',                       // coral text
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: '0 8px 30px rgba(39, 174, 96, 0.45)', // custom shadow
      fontFamily: "'Poppins', sans-serif",    // elegant modern font
      fontSize: '3rem',
      fontWeight: '500',
    }}>Employee Management App</h1>
            <div className="w-100 d-flex justify-content-center  mt-5">
                <div className='w-80 border rounded-4 shadow-lg  p-4  bg-718b5e' style={{ width: '80%' }}>
                    <div className='d-flex justify-content-between mb-3 bg-718b5e'>
                        <button className='btn btn-primary'
                            onClick={() => setShowModal(true)}>Add</button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Employees..."
                            className='form-control w-50'
                        />
                    </div>
                    <EmployeeTable
                        employees={employeesData.employees}
                        pagination={employeesData.pagination}
                        fetchEmployees={fetchEmployees}
                        handleUpdateEmployee={handleUpdateEmployee}
                    />

                    <AddEmployee
                        fetchEmployees={fetchEmployees}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        employeeObj={employeeObj}
                    />
                </div>
            </div>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default EmployeeManagementApp;

