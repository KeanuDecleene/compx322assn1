document.addEventListener("DOMContentLoaded", () => {
  displayEventTitles();
  document
    .getElementById("homeButton")
    .addEventListener("click", showEventTitles);
});

/**
 * Fetches event titles from the database and displays them in a list
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
        li.addEventListener("click", () => fetchEventDetails(index + 1)); // on click fetches event details and assumes id starts at 1
        eventList.appendChild(li);
      });
    }
  };
  eventRequest.send();
};

/**
 * Fetches and displays the details of a specific event
 * @param {number} eventId - The ID of the event to fetch details for
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
 * Displays the event titles list and hides the event details view
 */
const showEventTitles = () => {
  document.querySelector(".eventList").style.display = "block";
  document.querySelector(".eventList").style.margin = "0 auto";
  document.querySelector(".eventList").style.maxWidth = "480px";
  document.querySelector(".eventDetails").style.display = "none";
  displayEventTitles();
};
