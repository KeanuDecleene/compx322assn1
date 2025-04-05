<?php
include 'dbConnect.php';

//sets up the response type query and result
header('Content-Type: application/json');

//checks if id is set in the URL query
if (isset($_GET["id"])) {
    $eventId = intval($_GET["id"]);

    try {
        //prepares SQL query to fetch event details based on id
        $stmt = $conn->prepare("SELECT * FROM events WHERE id = :id");
        $stmt->bindParam(':id', $eventId, PDO::PARAM_INT);
        $stmt->execute();
        
        //checks if event exists and fetches details
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo json_encode($row); //sends back correct row in JSON
        } else {
            echo json_encode(["error" => "Event not found or query failed."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error: " . $e->getMessage()]);
    }

    $stmt = null;
}

$conn = null;
?>