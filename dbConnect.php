<?php
$servername = "localhost";  
$username = "root";         
$password = "";             
$dbname = "events"; 

//creates new MySQL connection 
$conn = new mysqli($servername, $username, $password, $dbname);

//checks for connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>