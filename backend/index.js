const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const EmployeeRoutes = require('./Routes/EmployeeRoutes');
const PORT = process.env.PORT || 8080;

require('./Models/db');

// Enable CORS for all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));

app.use(bodyParser.json());
app.use('/api/employees', EmployeeRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Employee Management System API is running!',
        timestamp: new Date().toISOString(),
        status: 'healthy'
    });
});

// Keep-alive endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log(`Health check available at: http://localhost:${PORT}/`);
});