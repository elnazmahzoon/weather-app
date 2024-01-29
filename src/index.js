function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function refreshWeather(response) {
  let searchCity = document.querySelector('#city');
  searchCity.innerHTML = response.data.city;

  let temp = document.querySelector('#temp');
  temp.innerHTML = Math.round(response.data.temperature.current);

  let descriptionElement = document.querySelector('#status');
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector('#humidity');
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector('#wind');
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector('#time');
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector('#icon');
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function searchCity(city) {
  let apiKey = 'd2fa3o5d84e8f709eat4a9eb65972bf2';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let formInput = document.querySelector('#form-input');
  searchCity(formInput.value);
}

let searchFormElement = document.querySelector('#search-form');
searchFormElement.addEventListener('submit', handleSearchSubmit);

searchCity('Paris');
