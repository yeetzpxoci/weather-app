import { getLocationData, getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeCityName, changeWeatherDetails } from "./dom.js";

document.getElementById("search-form").onsubmit = function () {return false};

document.getElementById("search-button").addEventListener("click", function () {
    const location = document.getElementById("search-bar").value;
    changeCityName(location);
    getLocationData(location).then(locationData => {
        getWeatherData(locationData[0].name).then(weatherData => {
            console.log(weatherData);
            const weatherObj = getWeatherObj(weatherData);
            changeWeatherDetails(weatherObj.temp, weatherObj.precip, weatherObj.humidity, weatherObj.wind);
        })
    }) 
})






