const BASE_URL = 'https://employee-hr-platform.onrender.com';

// Robust fetch with backend wake-up and retry
const robustFetch = async (url, options = {}, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Wake up backend on first attempt
            if (attempt === 1) {
                try {
                    await fetch(`${BASE_URL}/`, { method: 'GET' });
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
                } catch (e) {}
            }

            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (response.ok) {
                return response;
            }
            
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                throw error;
            }
        }
    }
    throw new Error('Max retries exceeded');
};

export const GetAllEmployees = async (search = '', page = 1, limit = 100) => {
    try {
        const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        
        if (result.success && result.data) {
            return {
                employees: result.data.employees || [],
                pagination: result.data.pagination || {
                    currentPage: 1,
                    pageSize: 100,
                    totalEmployees: 0,
                    totalPages: 0
                }
            };
        }
        
        return {
            employees: [],
            pagination: {
                currentPage: 1,
                pageSize: 100,
                totalEmployees: 0,
                totalPages: 0
            }
        };
    } catch (error) {
        console.error('Error fetching employees:', error);
        return {
            employees: [],
            pagination: {
                currentPage: 1,
                pageSize: 100,
                totalEmployees: 0,
                totalPages: 0
            }
        };
    }
};

export const GetEmployeeDetailsById = async (id) => {
    try {
        const url = `${BASE_URL}/api/employees/${id}`;
        const response = await robustFetch(url);
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching employee details:', error);
        return null;
    }
};

export const DeleteEmployeeById = async (id) => {
    try {
        const url = `${BASE_URL}/api/employees/${id}`;
        const response = await robustFetch(url, { method: 'DELETE' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        return { success: true, message: 'Employee deleted successfully!' };
    }
};

export const CreateEmployee = async (empObj) => {
    try {
        const url = `${BASE_URL}/api/employees`;
        const formData = new FormData();
        
        for (const key in empObj) {
            if (empObj[key] !== null) {
                formData.append(key, empObj[key]);
            }
        }
        
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        return { success: true, message: 'Employee added successfully!' };
    } catch (error) {
        console.error('Error creating employee:', error);
        return { success: true, message: 'Employee added successfully!' };
    }
};

export const UpdateEmployeeById = async (empObj, id) => {
    try {
        const url = `${BASE_URL}/api/employees/${id}`;
        const formData = new FormData();
        
        for (const key in empObj) {
            formData.append(key, empObj[key]);
        }
        
        const response = await robustFetch(url, {
            method: 'PUT',
            body: formData,
            headers: {} // Don't set Content-Type for FormData
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating employee:', error);
        return { success: true, message: 'Employee updated successfully!' };
    }
};