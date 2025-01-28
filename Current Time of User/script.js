// Get references to the HTML elements
let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let dayElement = document.getElementById('day');
let timezoneElement = document.getElementById('timezone');
let currentDateElement = document.getElementById('currentDate');

// Update the clock every second
setInterval(() => {
    // Get the current time using dayjs
    let currentTime = dayjs();

    // Update the hours, minutes, and seconds display
    hrs.innerHTML = (currentTime.hour() < 10 ? '0' : '') + currentTime.hour();
    min.innerHTML = (currentTime.minute() < 10 ? '0' : '') + currentTime.minute();
    sec.innerHTML = (currentTime.second() < 10 ? '0' : '') + currentTime.second();

    // Display the current day
    dayElement.innerHTML = currentTime.format('dddd'); // Get the current day using dayjs

    // Display the timezone as Africa/Johannesburg
    timezoneElement.innerHTML = "Africa/Johannesburg";

    // Display the current date
    currentDateElement.innerHTML = currentTime.format('MMMM D, YYYY'); // Get the current date using dayjs
}, 1000);
