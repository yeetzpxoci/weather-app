import { getLocationData, getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeCityName, changeWeatherDetails } from "./dom.js";

document.getElementById("search-form").onsubmit = function () {return false};

document.getElementById("search-button").addEventListener("click", function () {
    const location = document.getElementById("search-bar").value;
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






