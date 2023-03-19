import { getLocationData, getWeatherData, getWeatherObj, getWeatherArray } from "./handleAPI.js";
import { changeCityName, changeWeatherDetails, changeDailyWeatherDetails } from "./dom.js";
import { celsiusToFahrenheit, fahrenheitToCelsius } from "./converter.js"; 

const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const celsiusConverter = document.getElementById("celsius-converter");
const fahrenheitConverter = document.getElementById("fahrenheit-converter");
const degree = document.getElementById("degree");
let celsius = true; 

// default weather Amsterdam
getLocationData("Amsterdam").then(locationData => {
    changeCityName(locationData[0].name);
    console.log(locationData);
    getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
        const firstDay = getWeatherObj(weatherData.list[0]);
        changeWeatherDetails(firstDay.temp, firstDay.precip, firstDay.humidity, firstDay.wind, firstDay.icon);
        const weatherArray = getWeatherArray(weatherData.list);
        changeDailyWeatherDetails(weatherArray);
    })
}) 

searchForm.onsubmit = function () {return false};

searchButton.addEventListener("click", function () {
    const location = searchBar.value;
    getLocationData(location).then(locationData => {
        changeCityName(locationData[0].name);
        console.log(locationData);
        getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
            const weatherObj = getWeatherObj(weatherData.list[0]);
            console.log(weatherData);
            changeWeatherDetails(weatherObj.temp, weatherObj.precip, weatherObj.humidity, weatherObj.wind, weatherObj.icon);
            const weatherArray = getWeatherArray(weatherData.list);
            changeDailyWeatherDetails(weatherArray);
        })
    }) 
})

celsiusConverter.addEventListener("click", function () {
    if (!celsius) {
        celsiusConverter.style.color = "white";
        fahrenheitConverter.style.color = "rgb(208, 208, 208)";
        degree.innerText = fahrenheitToCelsius(parseInt(degree.innerText));
        celsius = true;
    }
})

fahrenheitConverter.addEventListener("click", function () {
    if (celsius) {
        celsiusConverter.style.color = "rgb(208, 208, 208)";
        fahrenheitConverter.style.color = "white";
        degree.innerText = celsiusToFahrenheit(parseInt(degree.innerText));
        celsius = false;
    }
})









