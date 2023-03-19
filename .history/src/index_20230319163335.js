import { getLocationData, getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeCityName, changeWeatherDetails } from "./dom.js";
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
        console.log(weatherData);
        changeWeatherDetails(firstDay.temp, firstDay.precip, firstDay.humidity, firstDay.wind, firstDay.icon);
        const secondDay = getWeatherObj(weatherData.list[8]);
        const thirdDay = getWeatherObj(weatherData.list[16]);
        const fourthDay = getWeatherObj(weatherData.list[32]);
        const fifthDay = getWeatherObj(weatherData.list[39]);
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









