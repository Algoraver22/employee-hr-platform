const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const handleApiError = (error, operation) => {
    console.error(`API Error in ${operation}:`, error);
    throw error;
};

export const GetAllEmployees = async (search = '', page = 1, limit = 100) => {
    try {
        const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data && result.data.employees) {
            return {
                employees: result.data.employees,
                pagination: result.data.pagination || {
                    currentPage: 1,
                    pageSize: limit,
                    totalEmployees: result.data.employees.length,
                    totalPages: 1
                }
            };
        }
        
        return {
            employees: [],
            pagination: {
                currentPage: 1,
                pageSize: limit,
                totalEmployees: 0,
                totalPages: 0
            }
        };
    } catch (error) {
        handleApiError(error, 'GetAllEmployees');
        return {
            employees: [],
            pagination: {
                currentPage: 1,
                pageSize: limit,
                totalEmployees: 0,
                totalPages: 0
            }
        };
    }
};

export const GetEmployeeDetailsById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/employees/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        handleApiError(error, 'GetEmployeeDetailsById');
        return null;
    }
};

export const DeleteEmployeeById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/employees/${id}`, { 
            method: 'DELETE' 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        handleApiError(error, 'DeleteEmployeeById');
        throw error;
    }
};

export const CreateEmployee = async (empObj) => {
    try {
        const formData = new FormData();
        
        for (const key in empObj) {
            if (empObj[key] !== null && empObj[key] !== undefined) {
                formData.append(key, empObj[key]);
            }
        }
        
        const response = await fetch(`${BASE_URL}/api/employees`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        handleApiError(error, 'CreateEmployee');
        throw error;
    }
};

export const UpdateEmployeeById = async (empObj, id) => {
    try {
        const formData = new FormData();
        
        for (const key in empObj) {
            if (empObj[key] !== null && empObj[key] !== undefined) {
                formData.append(key, empObj[key]);
            }
        }
        
        const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
            method: 'PUT',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        handleApiError(error, 'UpdateEmployeeById');
        throw error;
    }
};

// Leave Management API Functions
export const GetAllLeaves = async (status = '', employeeId = '') => {
    try {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (employeeId) params.append('employeeId', employeeId);
        
        const url = `${BASE_URL}/api/leaves?${params.toString()}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result.leaves || [];
    } catch (error) {
        handleApiError(error, 'GetAllLeaves');
        return [];
    }
};

export const CreateLeave = async (leaveData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/leaves`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leaveData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        handleApiError(error, 'CreateLeave');
        throw error;
    }
};

export const UpdateLeaveStatus = async (leaveId, status, approvedBy = '') => {
    try {
        const response = await fetch(`${BASE_URL}/api/leaves/${leaveId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, approvedBy })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        handleApiError(error, 'UpdateLeaveStatus');
        throw error;
    }
};

export const DeleteLeave = async (leaveId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/leaves/${leaveId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        handleApiError(error, 'DeleteLeave');
        throw error;
    }
};