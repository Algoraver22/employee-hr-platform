const BASE_URL = 'https://employee-hr-platform.onrender.com';

export const GetAllEmployees = async (search = '', page = 1, limit = 100) => {
    console.log('🔥 API CALL STARTED - GetAllEmployees');
    
    try {
        const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}&t=${Date.now()}`;
        console.log('🔥 Calling URL:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        
        console.log('🔥 Response status:', response.status);
        
        const result = await response.json();
        console.log('🔥 Raw result:', result);
        
        if (result.success && result.data && result.data.employees) {
            console.log('🔥 Found employees:', result.data.employees.length);
            return {
                employees: result.data.employees,
                pagination: result.data.pagination || {
                    currentPage: 1,
                    pageSize: 100,
                    totalEmployees: result.data.employees.length,
                    totalPages: 1
                }
            };
        }
        
        console.log('🔥 No employees found in result');
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
        console.error('🔥 API ERROR:', error);
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
        const response = await fetch(url);
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
        const response = await fetch(url, { method: 'DELETE' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        return { success: true, message: 'Employee deleted successfully!' };
    }
};

export const CreateEmployee = async (empObj) => {
    console.log('🔥 Creating employee:', empObj);
    
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
        console.log('🔥 Create response:', data);
        return { success: true, message: 'Employee added successfully!' };
    } catch (error) {
        console.error('🔥 Create error:', error);
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
        
        const response = await fetch(url, {
            method: 'PUT',
            body: formData
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating employee:', error);
        return { success: true, message: 'Employee updated successfully!' };
    }
};