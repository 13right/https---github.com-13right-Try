<?php
// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];

// Establish a connection to the SQL Server database
$serverName = "capstoneliwanag.database.windows.net"; // Your SQL Server's hostname or IP address
$connectionOptions = array(
    "Database" => "Capstone", // Your database name
    "Uid" => "Jennie", // Your database username
    "PWD" => "2harmaine!" // Your database password
);
$conn = sqlsrv_connect($serverName, $connectionOptions);

// Check connection
if (!$conn) {
    die("Connection failed: " . sqlsrv_errors());
}

// Insert data into the database
$sql = "INSERT INTO Bright (Employee, Email) VALUES (?, ?)";
$params = array($name, $email);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die("Error inserting data: " . sqlsrv_errors());
} else {
    echo "Data inserted successfully!";
}

// Close the connection
sqlsrv_close($conn);
?>
