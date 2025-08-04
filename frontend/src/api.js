const BASE_URL = 'https://employee-hr-platform.onrender.com';


export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}&_t=${Date.now()}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        const { data } = await result.json();
        return data;
    } catch (err) {
        console.error('Fetch employees error:', err);
        throw err;
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
        body: formData
    };
    
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        return { success: true, message: 'Employee added successfully!', data };
    } catch (err) {
        console.error('Create employee error:', err);
        return { success: false, message: 'Failed to add employee. Please try again.' };
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
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        return { success: true, message: 'Employee updated successfully!', data };
    } catch (err) {
        console.error('Update employee error:', err);
        return { success: false, message: 'Failed to update employee. Please try again.' };
    }
};

