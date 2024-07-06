// Grab user input and display the temeperature for that city
// and display it on the screen

function formatDate(date) {
  //   let date = new Date();

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
  let day = date.getDay();
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
  let date = new Date(response.data.time * 1000);
  console.log(date);
  let cityElement = document.querySelector("#city-of-choice");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let humidityVal = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  let windVal = response.data.wind.speed;
  //   let weatherIconImage = document.querySelector("#weather-icon");
  //   let weatherIcon = response.data.condition.icon;

  console.log(response.data);
  //   weatherIconImage.innerHTML = weatherIcon;
  humidity.innerHTML = `${humidityVal}%`;
  wind.innerHTML = `${windVal} km/hr`;
  weatherCondition.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  dayAndTime.innerHTML = formatDate(date);
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
