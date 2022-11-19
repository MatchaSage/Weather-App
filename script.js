let form = document.querySelector("#locationForm");
let locationText = document.querySelector("#searchLocation");
let weatherContainer = document.querySelector(".weatherContainer");
let header = document.querySelector(".header");
let miscWeather = document.querySelector(".miscWeather");
const weatherKey = "c6abf5b776e139b018a9479cb404a430";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(locationText.value);
});

async function getData(location = "Massillon") {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherKey}&units=imperial`;
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    let weatherObj = await parseData(data, location);
    clearDisplay();
    displayWeather(weatherObj);
  } catch (error) {
    console.log(error);
  }
}

async function parseData(data, location) {
  return {
    humidity: data.main.humidity,
    temp: data.main.temp,
    tempMax: data.main.temp_max,
    tempMin: data.main.temp_min,
    weather: data.weather[0].main,
    windSpeed: data.wind.speed,
    location: location,
  };
}

function displayWeather(weatherObj) {
  let headerLocation = document.querySelector(".headerLocation");
  headerLocation.textContent = weatherObj.location;
  let weatherDiv = document.createElement("div");
  weatherDiv.className = "weatherDiv";
  weatherDiv.append(`${Math.round(weatherObj.temp)} ° ${weatherObj.weather}`);
  weatherContainer.append(weatherDiv);

  let miscWeatherContainer = document.createElement("div");
  miscWeatherContainer.className = "miscWeatherContainer";
  miscWeatherContainer.append(
    `Humidity ${Math.round(weatherObj.humidity)} Max ${Math.round(
      weatherObj.tempMax
    )} Min ${Math.round(weatherObj.tempMin)} Wind ${Math.round(
      weatherObj.windSpeed
    )} m/h`
  );

  miscWeather.append(miscWeatherContainer);
}

function clearDisplay() {
  if (weatherContainer.firstChild) {
    weatherContainer.removeChild(weatherContainer.firstChild);
  }
  while (miscWeather.firstChild) {
    miscWeather.removeChild(miscWeather.firstChild);
  }
}
getData();
