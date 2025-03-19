document.addEventListener("DOMContentLoaded", () => {
  //initialise all event listeners and display the event titles
  displayEventTitles();
  document
    .getElementById("homeButton")
    .addEventListener("click", showEventTitles);
  document
    .getElementById("updateEventBtn")
    .addEventListener("click", updateEvent);
  document
    .getElementById("getWeatherBtn")
    .addEventListener("click", getWeather);
});

let eventIdStore; //store the id of event
let longLat = []; //store the long lat of event
let eventLocation; //store the location of the event

/**
 * gets the weather for the current event based on longitude and latitude
 * calls php script to get the wanted json data from API returned back into this method
 * to then display the weather information
 */
const getWeather = () => {
  const [latitude, longitude] = longLat;

  //sends the longitude and latitude in a POST request to server
  fetch("fetch_weather.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      longitude: longitude,
      latitude: latitude,
    }),
  })
    .then((response) => response.json()) //turns response object into json object
    .then((data) => {
      //handle the weather data and update the HTML
      if (data) {
        const currentTemp = data.current_temp;
        const minTemp = data.min_temp;
        const maxTemp = data.max_temp;
        const windSpeed = data.wind_speed;
        const cloudCover = data.cloud_cover;
        const weatherDescription = data.description;

        //format the weather information as a string for html
        const weatherInfoHTML = `
          <h2>Current Weather at ${eventLocation}:</h2>
          <p><strong>Temperature:</strong> ${currentTemp}°C</p>
          <p><strong>Min Temperature:</strong> ${minTemp}°C</p>
          <p><strong>Max Temperature:</strong> ${maxTemp}°C</p>
          <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
          <p><strong>Cloud Cover:</strong> ${cloudCover}%</p>
          <p><strong>Weather:</strong> ${weatherDescription}</p>
        `;

        //display the weather info with the formatted info
        document.getElementById("weatherInfo").innerHTML = weatherInfoHTML;
      } else {
        document.getElementById("weatherInfo").innerHTML =
          "<p>Unable to fetch weather data. Invalid data received.</p>";
      }
    })
    .catch((error) => {
      document.getElementById("weatherInfo").innerHTML =
        "<p>Error fetching weather data.</p>";
    });
};

/**
 *updates the event details in db through AJAX request
 */
const updateEvent = () => {
  const updateRequest = new XMLHttpRequest();
  //gets the current form inputs
  eName = document.getElementById("eventName").value;
  cat = document.getElementById("category").value;
  month = document.getElementById("month").value;
  day = document.getElementById("day").value;
  time = document.getElementById("time").value;
  cost = document.getElementById("cost").value;
  eventLocation = document.getElementById("location").value;
  notes = document.getElementById("notes").value;

  let url = "event_update.php";
  updateRequest.onload = () => {
    eventUpdate(updateRequest.responseText);
  };
  updateRequest.open("POST", url);
  updateRequest.setRequestHeader("Content-Type", "application/json");

  //sets up json to send to server to then update db
  let data = {
    id: eventIdStore,
    eName: eName,
    cat: cat,
    month: month,
    day: day,
    time: time,
    cost: cost,
    location: eventLocation,
    notes: notes,
  };
  updateRequest.send(JSON.stringify(data));
};

/**
 * uses the response from the server to display a message to the user that disappears after 4 seconds
 * @param {string} responseText - the response from the server
 */
let eventUpdate = (responseText) => {
  let updateElement = document.getElementById("event_update");
  updateElement.innerHTML = responseText;
  updateElement.style.display = "block";

  //sets a timeout to hide response message after 4 seconds (4000 milliseconds)
  setTimeout(() => {
    updateElement.style.display = "none";
  }, 4000);
};

/**
 * fetches event titles from the database and displays them in a list
 */
const displayEventTitles = () => {
  //new xml request to fetch the events data
  const eventRequest = new XMLHttpRequest();
  eventRequest.open("GET", "events_fetch.php", true);
  eventRequest.onload = () => {
    if (eventRequest.status === 200) {
      const events = JSON.parse(eventRequest.responseText);
      const eventList = document.getElementById("events");
      eventList.innerHTML = "";

      //loops through every event, creating a list item, and adds it to list
      events.forEach((event, index) => {
        const li = document.createElement("li");
        li.textContent = event;
        li.addEventListener("click", () => fetchEventDetails(index + 1)); //on click fetches event details and assumes id starts at 1
        eventList.appendChild(li);
      });
    }
  };
  eventRequest.send();
};

/**
 * fetches and displays the details of a specific event
 * @param {number} eventId - the ID of the event to fetch details for
 */
const fetchEventDetails = (eventId) => {
  const detailsRequest = new XMLHttpRequest();
  detailsRequest.open("GET", `fetch_event_details.php?id=${eventId}`, true);
  detailsRequest.onload = () => {
    if (detailsRequest.status === 200) {
      const event = JSON.parse(detailsRequest.responseText);

      //checks for errors and populates the form elements with the event details
      if (!event.error) {
        document.getElementById("eventName").value = event.name;
        document.getElementById("category").value = event.category;
        document.getElementById("month").value = event.month;
        document.getElementById("day").value = event.day;
        document.getElementById("time").value = event.time;
        document.getElementById("cost").value = event.cost;
        document.getElementById("location").value = event.location;
        document.getElementById("notes").value = event.notes;

        //sets the needed properties for other methods to work
        eventIdStore = eventId;
        const lonLatArray = event.lon_lat
          .split(",")
          .map((coord) => parseFloat(coord.trim()));
        longLat = lonLatArray;
        eventLocation = event.location;

        //hides event list and shows the event details
        document.querySelector(".eventList").style.display = "none";
        document.querySelector(".eventDetails").style.display = "block";
      } else {
        console.error("Event not found.");
      }
    }
  };
  detailsRequest.send();
};

/**
 * displays the event titles list, hides the event details, hides weather info
 */
const showEventTitles = () => {
  document.getElementById("weatherInfo").innerHTML = "";
  document.querySelector(".eventList").style.display = "block";
  document.querySelector(".eventList").style.margin = "0 auto";
  document.querySelector(".eventList").style.maxWidth = "480px";
  document.querySelector(".eventDetails").style.display = "none";
  displayEventTitles();
};
