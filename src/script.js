// Grab user input and display the temeperature for that city
// and display it on the screen

function formatDate() {
  let date = new Date();
  console.log(date);

  //   let monthsOfYear = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = daysOfWeek[date.getDay()];
  //   let currentMonth = monthsOfYear[date.getMonth()];

  let day = date.getDay();
  //   let year = date.getFullYear();

  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (day < 10) {
    day = `0${day}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${currentDay} ${hour}:${minutes},`;
}

function updateWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let tempVal = document.querySelector("#temperature");
  let dayAndTime = document.querySelector("#day-and-time");
  let cityElement = document.querySelector("#city-of-choice");

  cityElement.innerHTML = response.data.city;
  console.log(response.data.city);
  dayAndTime.innerHTML = formatDate();
  tempVal.innerHTML = temperature;
}

function searchCity(city) {
  // separation of concerns ; have functions only do one thing
  let apiKey = "abf74f3d08ac0ba0527t801bd8o47a65";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(updateWeather);
}

function searchEvent(event) {
  event.preventDefault();
  let cityVal = document.querySelector("#city");
  let cityName = document.querySelector(".weather-app-city");
  cityName.innerHTML = cityVal.value;
  searchCity(cityVal.value);

  formatDate();
}

let citySearch = document.querySelector(".search-form");
citySearch.addEventListener("submit", searchEvent);

searchCity("Charlotte");
