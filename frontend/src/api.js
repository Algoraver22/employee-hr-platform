const BASE_URL = 'https://employee-hr-platform.onrender.com';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    // Wake up backend first
    try {
        await fetch(`${BASE_URL}/`, { method: 'GET' });
    } catch (e) {}
    
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    
    try {
        const result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!result.ok) {
            throw new Error(`HTTP ${result.status}`);
        }
        
        const response = await result.json();
        return response.data || response;
    } catch (err) {
        // Retry once after 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
        try {
            const result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const response = await result.json();
            return response.data || response;
        } catch (retryErr) {
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
}

export const GetEmployeeDetailsById = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
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
        body: formData
    };
    
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
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
        body: formData
    };
    
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
};