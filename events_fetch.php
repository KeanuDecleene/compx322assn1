<?php
include 'dbConnect.php';

//set the response type to JSON
header('Content-Type: application/json');

try {
    //prepare the SQL query
    $sql = "SELECT name FROM events"; 

    $query = $conn->query($sql);
    $events = [];

    //check if the query returns any rows
    if ($query->rowCount() > 0) {
        //fetch all the results and store the event names
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $events[] = $row["name"];
        }
    } else {
        echo json_encode(["message" => "No events found."]);
        exit;
    }
    echo json_encode($events);

} catch (PDOException $e) {
    //handle any query execution errors
    echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
}
//close the connection
$conn = null;
?>
