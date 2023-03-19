import { getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeWeatherDetails } from "./dom.js";

document.getElementById("search-button").addEventListener("click", function () {
    getWeatherData(document.getElementById("search-bar")).then(data => {
        const weatherObj = getWeatherObj(data);
        changeWeatherDetails(weatherObj.humidity, weatherObj.precip, weatherObj.wind);
    })
})

