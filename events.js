document.addEventListener("DOMContentLoaded", () => {
  fetchEvents();
});

let eventRequest = new XMLHttpRequest();

/**
 *fetches events from the php script
 */
const fetchEvents = () => {
  let url = "events_fetch.php";
  eventRequest.onload = displayEvents; //once request loads call displayEvents
  eventRequest.open("GET", url, true);
  eventRequest.send();
};

/**
 * displays fetched events in the HTML list
 */
let displayEvents = () => {
  if (eventRequest.status === 200) {
    //parses the JSON response and gets elements to display, and clears previous data
    let events = JSON.parse(eventRequest.responseText);
    let eventList = document.getElementById("events");
    eventList.innerHTML = "";

    //loops through the events and creates a list item for each event,
    events.forEach((title) => {
      let li = document.createElement("li");
      li.textContent = title; // Display only event title
      eventList.appendChild(li);
    });
  } else {
    console.error("Failed to fetch events:", eventRequest.status);
  }
};
