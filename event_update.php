<?php

include 'dbConnect.php';
//gets the json data and decodes it into $data
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);

//get the values 
$eventId = $data['id'];
$ename = mysqli_real_escape_string($conn, $data['eName']); // escaping apostraphe was breaking SQL query
$cat = $data['cat'];
$month = $data['month'];
$day = $data['day'];
$time = $data['time'];
$cost = $data['cost'];
$location = strval($data['location']);
$notes = $data['notes'];

//using an update query to update the event, using id to identify the record
$query = "UPDATE events 
        SET name='$ename', category='$cat', month='$month', day='$day', time='$time', cost='$cost', location='$location', notes='$notes' 
        WHERE id='$eventId'";

//runs query and checks response
if($conn->query($query)){
    echo "Event updated successfully";
}else{
    echo "Error updating event: " . $conn->error;
};

$conn->close();

?>