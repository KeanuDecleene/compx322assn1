<?php
include 'dbConnect.php'; //connects to the db

//sets up the response type query and result
header('Content-Type: application/json');

//checks if id is set in the url query
if (isset($_GET["id"])) {
    $eventId = intval($_GET["id"]);

    //prepares SQL query to fetch event details based on id
    $stmt = $conn->prepare("SELECT * FROM events WHERE id = ?");
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $result = $stmt->get_result();

    //checks if event exists and fetches details
    if ($result && $row = $result->fetch_assoc()) {
        echo json_encode($row); //sends back correct row in JSON 
    } else {
        echo json_encode(["error" => "Event not found or query failed."]);
    }

    $stmt->close();
}

$conn->close();
?>