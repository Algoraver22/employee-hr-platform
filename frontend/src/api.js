const BASE_URL = 'https://employee-hr-platform.onrender.com';


// Wake up the backend server
const wakeUpBackend = async () => {
    try {
        await fetch(`${BASE_URL}/`, { method: 'GET', mode: 'cors' });
    } catch (err) {
        console.log('Waking up backend...');
    }
};

export const GetAllEmployees = async (search = '', page = 1, limit = 5, retryCount = 0) => {
    // Wake up backend on first call
    if (retryCount === 0) {
        wakeUpBackend();
    }
    
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}&_t=${Date.now()}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        mode: 'cors',
        timeout: 30000 // 30 second timeout
    };
    
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            console.error(`API Error: ${result.status} - ${result.statusText}`);
            
            // Retry once if server error (backend might be waking up)
            if (result.status >= 500 && retryCount < 1) {
                console.log('Retrying after server error...');
                await new Promise(resolve => setTimeout(resolve, 3000));
                return GetAllEmployees(search, page, limit, retryCount + 1);
            }
            
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
        
        // Retry once on network error (backend might be sleeping)
        if (retryCount < 1) {
            console.log('Retrying after network error...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            return GetAllEmployees(search, page, limit, retryCount + 1);
        }
        
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

