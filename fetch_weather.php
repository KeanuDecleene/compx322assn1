<?php
//get the JSON input from the request body
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);

header('Content-Type: application/json'); //sets the response content type

//longitude and latitude from the decoded JSON
$longitude = $data['longitude'];
$latitude = $data['latitude'];

//set up api call
$apiKey = 'cb0982f4577481ba7a5b0b30fdef6106';
$URL = "https://api.openweathermap.org/data/3.0/onecall?lat=$latitude&lon=$longitude&appid=$apiKey&units=metric";

$response = file_get_contents($URL);
$weatherData = json_decode($response, true);

//extracts the weather data from the JSON response returns null if doesnt exist
$weatherDataResponse = [
    'current_temp' => $weatherData['current']['temp'] ?? null,
    'min_temp' => $weatherData['daily'][0]['temp']['min'] ?? null,
    'max_temp' => $weatherData['daily'][0]['temp']['max'] ?? null,
    'wind_speed' => $weatherData['current']['wind_speed'] ?? null,
    'cloud_cover' => $weatherData['current']['clouds'] ?? null,
    'description' => $weatherData['current']['weather'][0]['description'] ?? null
];

//return the weather data as JSON
echo json_encode($weatherDataResponse);
?>