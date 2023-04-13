import { getDays, getHours, celsiusToFahrenheit, fahrenheitToCelsius } from "./converter.js"; 
import { getLocationData, getWeatherData, getWeatherObj, getWeatherArrayDaily, getWeatherArrayHourly } from "./handleAPI.js"

const cityName = document.getElementById("city-name");
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const celsiusConverterButton = document.getElementById("celsius-converter");
const fahrenheitConverterButton = document.getElementById("fahrenheit-converter");
const degree = document.getElementById("degree");
const weather = document.getElementById("weather-description");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const dailyButton = document.getElementById("daily");
const hourlyButton = document.getElementById("hourly");
let currentBackground = document.getElementById("rain");
let celsiusActive = true; 
let dailyActive = true;

function changeCityName(newCityName) {
    cityName.innerText = newCityName;
}

function changeBackground(weatherCondition) {
    const thunderstorm = document.getElementById("thunderstorm");
    const rain = document.getElementById("rain");
    const snow = document.getElementById("snow");
    const clear = document.getElementById("clear");
    const cloud = document.getElementById("cloud");

    switch (weatherCondition) {
        case "Thunderstorm":
            currentBackground.style.opacity = 0;
            thunderstorm.style.opacity = 1;
            currentBackground = thunderstorm;
            break;
        case "Rain":
            currentBackground.style.opacity = 0;
            rain.style.opacity = 1;
            currentBackground = rain;
            break;
        case "Snow":
            currentBackground.style.opacity = 0;
            snow.style.opacity = 1;
            currentBackground = snow;
            break;
        case "Clear":
            currentBackground.style.opacity = 0;
            clear.style.opacity = 1;
            currentBackground = clear;
            break;
        case "Clouds":
            currentBackground.style.opacity = 0;
            cloud.style.opacity = 1;
            currentBackground = cloud;
            break;
        default:
            break;
    }
}

function changeWeatherDetails(newTemp, newWeather, newPrecipity, newHumidity, newWind, newIcon) {
    degree.innerText = newTemp;
    weather.innerText = newWeather;
    precipitation.innerText = newPrecipity + "%";
    humidity.innerText = newHumidity + "%";
    wind.innerText = newWind;
    document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + newIcon + "@2x.png";
}

function changeDailyWeatherDetails(weatherArray){
    const days = document.querySelectorAll(".day-hour");
    const icons = document.querySelectorAll(".weather-icon-day-hour");
    const degrees = document.querySelectorAll(".degree-day-hour");
    const dayNames = getDays();

    for (let i = 0; i < days.length; i++) {
        days[i].innerText = dayNames[i];
        icons[i].src = "https://openweathermap.org/img/wn/" + weatherArray[i].icon.slice(0, -1) + 'd' + "@2x.png";
        degrees[i].innerText = weatherArray[i].temp + '°';
    }
}

function changeHourlyWeatherDetails(weatherArray, hoursArray) {
    const hours = document.querySelectorAll(".day-hour");
    const icons = document.querySelectorAll(".weather-icon-day-hour");
    const degrees = document.querySelectorAll(".degree-day-hour");

    for (let i = 0; i < hours.length; i++) {
        hours[i].innerText = hoursArray[i];
        icons[i].src = "https://openweathermap.org/img/wn/" + weatherArray[i].icon.slice(0, -1) + 'd' + "@2x.png";
        degrees[i].innerText = weatherArray[i].temp + '°';
    }
}

searchForm.onsubmit = function () { return false };

searchButton.addEventListener("click", function () {
    const location = searchBar.value;
    getLocationData(location).then(locationData => {
        changeCityName(locationData[0].name);
        console.log(locationData);
        getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
            const weatherObj = getWeatherObj(weatherData.list[0]);
            console.log(weatherData);
            changeWeatherDetails(weatherObj.temp, weatherObj.weather, weatherObj.precip, weatherObj.humidity, weatherObj.wind, weatherObj.icon);
            changeBackground(weatherObj.weather);
            const weatherArray = getWeatherArray(weatherData.list);
            if (dailyActive) {
                changeDailyWeatherDetails(weatherArray);
            } else {
                const hoursArray = [
                    weatherData.list[0].dt_txt.slice(10, 16),
                    weatherData.list[1].dt_txt.slice(10, 16),
                    weatherData.list[2].dt_txt.slice(10, 16),
                    weatherData.list[3].dt_txt.slice(10, 16),
                    weatherData.list[4].dt_txt.slice(10, 16),
                ]
                const weatherArray = getWeatherArrayHourly(weatherData.list);
                changeHourlyWeatherDetails(weatherArray, hoursArray);
            }
        })
    })
})

celsiusConverterButton.addEventListener("click", function () {
    if (!celsiusActive) {
        // change daily degrees
        const days = document.querySelectorAll(".degree-day-hour");
        days.forEach(x => x.innerText = fahrenheitToCelsius(parseInt(x.innerText)) + '°');

        celsiusConverterButton.style.color = "white";
        fahrenheitConverterButton.style.color = "rgb(208, 208, 208)";

        // change main degree
        degree.innerText = fahrenheitToCelsius(parseInt(degree.innerText));

        celsiusActive = true;
    }
})

fahrenheitConverterButton.addEventListener("click", function () {
    if (celsiusActive) {
        const days = document.querySelectorAll(".degree-day-hour");
        days.forEach(x => x.innerText = celsiusToFahrenheit(parseInt(x.innerText)) + '°');

        celsiusConverterButton.style.color = "rgb(208, 208, 208)";
        fahrenheitConverterButton.style.color = "white";

        degree.innerText = celsiusToFahrenheit(parseInt(degree.innerText));

        celsiusActive = false;
    }
})

dailyButton.addEventListener("click", function () {
    const currentLocation = document.getElementById("city-name").innerText;

    if (!dailyActive) {
        dailyActive = true;
        document.getElementById("daily").style.color = "white";
        document.getElementById("hourly").style.color = "rgb(208, 208, 208)";
        getLocationData(currentLocation).then(locationData => {
            changeCityName(locationData[0].name);
            getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
                const weatherArray = getWeatherArrayDaily(weatherData.list);
                changeDailyWeatherDetails(weatherArray);
            })
        })
    }
}) 

hourlyButton.addEventListener("click", function () {
    const currentLocation = document.getElementById("city-name").innerText;
    if (dailyActive) {
        dailyActive = false;
        document.getElementById("daily").style.color = "rgb(208, 208, 208)";
        document.getElementById("hourly").style.color = "white";
        getLocationData(currentLocation).then(locationData => {
            changeCityName(locationData[0].name);
            getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
                const hoursArray = [
                    weatherData.list[0].dt_txt.slice(10, 16),
                    weatherData.list[1].dt_txt.slice(10, 16),
                    weatherData.list[2].dt_txt.slice(10, 16),
                    weatherData.list[3].dt_txt.slice(10, 16),
                    weatherData.list[4].dt_txt.slice(10, 16),
                ]
                const weatherArray = getWeatherArrayHourly(weatherData.list);
                changeHourlyWeatherDetails(weatherArray, hoursArray);
            })
        })
    }
}) 

export { changeCityName, changeBackground, changeWeatherDetails, changeDailyWeatherDetails };