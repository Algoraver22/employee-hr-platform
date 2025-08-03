const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const EmployeeRoutes = require('./Routes/EmployeeRoutes');
const PORT = process.env.PORT || 8080;

require('./Models/db');
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:3001', // your frontend origin
  credentials: true
}));
app.use(bodyParser.json());

app.use('/api/employees', EmployeeRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the Employee Management System API');
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})