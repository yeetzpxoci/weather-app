import { getLocationData, getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeCityName, changeWeatherDetails } from "./dom.js";
import { celciusToFahrenheit, fahrenheitToCelsius } from "./converter.js"; 

const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const celsiusConverter = document.getElementById("celsius-converter");
const fahrenheitConverter = document.getElementById("fahrenheit-converter");
const degree = document.getElementById("degree");

// default weather Amsterdam
getLocationData("Amsterdam").then(locationData => {
    changeCityName(locationData[0].name);
    console.log(locationData);
    getWeatherData(locationData[0].name).then(weatherData => {
        const weatherObj = getWeatherObj(weatherData);
        console.log(weatherData);
        changeWeatherDetails(weatherObj.temp, weatherObj.precip, weatherObj.humidity, weatherObj.wind, weatherObj.icon);
    })
}) 

searchForm.onsubmit = function () {return false};

searchButton.addEventListener("click", function () {
    const location = searchBar.value;
    getLocationData(location).then(locationData => {
        changeCityName(locationData[0].name);
        console.log(locationData);
        getWeatherData(locationData[0].name).then(weatherData => {
            const weatherObj = getWeatherObj(weatherData);
            console.log(weatherData);
            changeWeatherDetails(weatherObj.temp, weatherObj.precip, weatherObj.humidity, weatherObj.wind, weatherObj.icon);
        })
    }) 
})

celsiusConverter.addEventListener("click", function () {
    document.getElementById("degree").innerHTML = 
})

fahrenheitConverter.addEventListener("click", function () {

})









