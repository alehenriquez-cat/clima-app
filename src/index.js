function showTemperature(response) {
  let temperatureElement = document.querySelector("#app-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#app-city");
  let descriptionElement = document.querySelector("#clima-description");
  let humidityElement = document.querySelector("#clima-humidity");
  let windElement = document.querySelector("#clima-wind");
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let timeElement = document.querySelector("#clima-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#clima-app-temperature-icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" class="clima-app-icon"/>`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);

  function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${day} ${hour}:${minute}`;
  }
}
function searchCity(city) {
  let apiKey = "a488e2130c3et2d5ao1ef3ffc71e4b14";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="clima-app-forecast-day">
            <div class="clima-app-forecast-date">${day}</div>
            <div class="clima-app-forecast-icon">☀️</div>
            <div class="clima-app-forecast-temperatures">
              <div class="clima-app-forecast-temperature">
                <strong>15°</strong>
              </div>
              <div class="clima-app-forecast-temperature">9°</div>
            </div>
          </div>
          `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Melbourne");
displayForecast();
