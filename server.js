const express = require('express');
const sql = require('mssql');
const path = require('path')

const app = express();
const port = 8000;



app.use(express.static(path.join(__dirname)));

// Database configuration
const config = {
    user: 'Jennie',
    password: '2harmaine!',
    server: 'capstoneliwanag.database.windows.net',
    database: 'Capstone',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

// Create a database pool
const pool = new sql.ConnectionPool(config);
pool.connect();

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST route to handle form submission
app.post('/submit', async (req, res) => {
    console.log("Request Body:", req.body);
    const { name, email } = req.body;
    console.log("Name:", name);
    console.log("Email:", email);
    try {
        // Insert data into the database using parameterized query
        const request = pool.request();
        request.input('name', sql.NVarChar, name);
        request.input('email', sql.NVarChar, email);
        
        const result = await request.query('INSERT INTO Bright VALUES (@name, @email)');
        const select = await sql.query('SELECT * FROM Bright');
        console.log(select.recordset);
            
        console.log("Data successfully inserted!");
        res.send('Data successfully inserted!' + name + email);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting data into database');
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});