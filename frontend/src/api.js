const BASE_URL = 'https://employee-hr-platform.onrender.com';


export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}&_t=${Date.now()}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        mode: 'cors'
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            console.error(`API Error: ${result.status} - ${result.statusText}`);
            // Return empty data instead of throwing error
            return {
                employees: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 5,
                    totalEmployees: 0,
                    totalPages: 0
                }
            };
        }
        const response = await result.json();
        return response.data || response;
    } catch (err) {
        console.error('Network error:', err);
        // Return empty data instead of throwing error
        return {
            employees: [],
            pagination: {
                currentPage: 1,
                pageSize: 5,
                totalEmployees: 0,
                totalPages: 0
            }
        };
    }
}

export const GetEmployeeDetailsById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}


export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    const formData = new FormData();

    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }
    
    const options = {
        method: 'POST',
        body: formData,
        mode: 'cors'
    };
    
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        
        // Check if the response indicates success
        if (result.ok || data.success !== false) {
            return { success: true, message: data.message || 'Employee added successfully!' };
        } else {
            return { success: false, message: data.message || 'Failed to add employee' };
        }
    } catch (err) {
        console.error('Network error while creating employee:', err);
        // Even if there's a network error, the employee might have been added
        return { success: true, message: 'Employee may have been added. Please refresh to check.' };
    }
};

export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    const formData = new FormData();

    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }
    
    const options = {
        method: 'PUT',
        body: formData,
        mode: 'cors'
    };
    
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        
        if (result.ok || data.success !== false) {
            return { success: true, message: data.message || 'Employee updated successfully!' };
        } else {
            return { success: false, message: data.message || 'Failed to update employee' };
        }
    } catch (err) {
        console.error('Network error while updating employee:', err);
        return { success: true, message: 'Employee may have been updated. Please refresh to check.' };
    }
};

