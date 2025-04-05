<?php

include 'dbConnect.php';
//gets the json data and decodes it into $data
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);

$eventId = $data['id'];
$ename = $data['eName']; 
$cat = $data['cat'];
$month = $data['month'];
$day = $data['day'];
$time = $data['time'];
$cost = $data['cost'];
$location = strval($data['location']);
$notes = $data['notes'];

//using an update query to update the event, using id to identify the record
try {
    $query = "UPDATE events 
              SET name = :ename, category = :cat, month = :month, 
                  day = :day, time = :time, cost = :cost, 
                  location = :location, notes = :notes 
              WHERE id = :eventId";
    
    //prepares the query without executing yet and binds variables
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':ename', $ename);
    $stmt->bindValue(':cat', $cat);
    $stmt->bindValue(':month', $month);
    $stmt->bindValue(':day', $day);
    $stmt->bindValue(':time', $time);
    $stmt->bindValue(':cost', $cost);
    $stmt->bindValue(':location', $location);
    $stmt->bindValue(':notes', $notes);
    $stmt->bindValue(':eventId', $eventId, PDO::PARAM_INT);

    $stmt->execute();
    
    echo "Event updated successfully";
} catch (PDOException $e) {
    echo "Error updating event: " . $e->getMessage();
}

$conn = null;
?>