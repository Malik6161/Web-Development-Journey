const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");

const day = document.getElementById("day");
const fullDate = document.getElementById("full-date");

const timezone = document.getElementById("timezone");
const locationName = document.getElementById("location-name");

function updateClock() {

    const selectedZone = timezone.value;

    const now = new Date();

    // Get time for selected timezone
    const time = new Intl.DateTimeFormat("en-US", {
        timeZone: selectedZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).format(now);

    // Split time into parts
    const timeParts = time.split(" ");

    const clock = timeParts[0];
    const period = timeParts[1];

    const values = clock.split(":");

    hours.textContent = values[0];
    minutes.textContent = values[1];
    seconds.textContent = values[2];
    ampm.textContent = period;

    // Get day
    day.textContent = new Intl.DateTimeFormat("en-US", {
        timeZone: selectedZone,
        weekday: "long"
    }).format(now);

    // Get full date
    fullDate.textContent = new Intl.DateTimeFormat("en-US", {
        timeZone: selectedZone,
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(now);

    // Update selected location
    locationName.textContent =
        timezone.options[timezone.selectedIndex].text;

}

// Update immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);

// Change clock when another country is selected
timezone.addEventListener("change", updateClock);