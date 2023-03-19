import { getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeCityName, changeWeatherDetails } from "./dom.js";

document.getElementById("search-button").addEventListener("click", function () {
    const cityName = document.getElementById("search-bar");
    changeCityName(cityName);
    getWeatherData(cityName).then(data => {
        const weatherObj = getWeatherObj(data);
        changeWeatherDetails(weatherObj.humidity, weatherObj.precip, weatherObj.wind);
    })
})

