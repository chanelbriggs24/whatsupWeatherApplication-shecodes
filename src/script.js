// Grab user input and display the temeperature for that city
// and display it on the screen

function formatDate(date) {
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
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${currentDay} ${hour}:${minutes},`;
}

function updateWeather(response) {
  let tempVal = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);

  let dayAndTime = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);

  let cityElement = document.querySelector("#city-of-choice");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherIconImage = document.querySelector("#weather-icon");

  let humidityVal = response.data.temperature.humidity;
  let windVal = response.data.wind.speed;
  let weatherIcon = response.data.condition.icon_url;

  dayAndTime.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;

  weatherCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${humidityVal}%`;
  wind.innerHTML = `${windVal} mph`;
  weatherIconImage.innerHTML = ` <img
                src="${weatherIcon}"
                alt=""
                class="weather-app-icon"
              />`;
  tempVal.innerHTML = temperature;

  getForecastData(response.data.city);
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
  searchCity(cityVal.value);
}

let citySearch = document.querySelector(".search-form");
citySearch.addEventListener("submit", searchEvent);

function formatDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[day.getDay()];
}

function getForecastData(city) {
  let apiKey = `abf74f3d08ac0ba0527t801bd8o47a65`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  //   // This code takes the array of daysOfWeek and it will loop through
  //   //each element and perform the function below on each item in the array

  //   //This variable that has an empty string will store each element forecast
  //   //after the loop performs the function on the day and then the next element will
  //   //be concatenated to the string of variables instead of it being overwritten
  let forecastInfo = ``;

  response.data.daily.forEach(function (day, index) {
    // The forecast API returns an array with days where the first element of the array is the
    // current day. With this, if you exclude the first item and start on the second, then it'll
    // always start on "tomorrow" because the days returned by the api are also dynamic and will
    // change as the days change
    if (index > 0 && index < 6) {
      forecastInfo =
        forecastInfo +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-weekday">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
                <div class="weather-forecast-temp">
                    <div class="weather-forecast-tempRange">
                        <strong>${Math.round(
                          day.temperature.maximum
                        )}&deg;</strong>
                    </div>
                    <div class="weather-forecast-tempRange">${Math.round(
                      day.temperature.minimum
                    )}&deg;</div>
                </div>
        </div>
    `;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastInfo;
}

// function displayForecast() {
//   let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   //   // This code takes the array of daysOfWeek and it will loop through
//   //   //each element and perform the function below on each item in the array

//   //   //This variable that has an empty string will store each element forecast
//   //   //after the loop performs the function on the day and then the next element will
//   //   //be concatenated to the string of variables instead of it being overwritten
//   let forecastInfo = ``;

//   daysOfWeek.forEach(function (day) {
//     forecastInfo += `<div class="weather-forecast-day">
//      <div class="weather-forecast-weekday">${day}</div>
//      <div class="weather-forecast-icon">⛅</div>
//      <div class="weather-forecast-temp">
//        <div class="weather-forecast-tempRange">
//          <strong>15&deg;</strong>
//        </div>
//        <div class="weather-forecast-tempRange">9&deg;</div>
//      </div>
//    </div>
//  `;
//   });

//   let forecast = document.querySelector("#forecast");
//   forecast.innerHTML = forecastInfo;
// }

searchCity("Charlotte");
