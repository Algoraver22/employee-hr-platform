const BASE_URL = 'https://employee-hr-platform.onrender.com';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const result = await fetch(url, options);
        const response = await result.json();
        return response.data || response;
    } catch (err) {
        console.error('Error fetching employees:', err);
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