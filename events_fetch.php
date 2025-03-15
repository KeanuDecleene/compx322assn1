<?php
include 'dbConnect.php'; //connects to db

//sets up the response type query and result
header('Content-Type: application/json'); 
$sql = "SELECT name FROM events"; 
$result = $conn->query($sql);

$events = [];
//checks if query was successful and loops through the rows storing event names into $events
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $events[] = $row["name"];
    }
} else {
    echo "No events found or query failed.";
}

//returns only event titles in json format and closes the connection
echo json_encode($events); 
$conn->close();
?>