import { getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeCityName, changeWeatherDetails } from "./dom.js";

document.getElementById("search-form").onsubmit = function () {return false};

document.getElementById("search-button").addEventListener("click", function () {
    const cityName = document.getElementById("search-bar").value;
    changeCityName(cityName);
    getWeatherData(cityName).then(data => {
        const weatherObj = getWeatherObj(data);
        changeWeatherDetails(weatherObj.temp, weatherObj.humidity, weatherObj.precip, weatherObj.wind);
    })
})

