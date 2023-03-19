import { getWeatherData, getWeatherObj } from "./handleAPI.js";
import { changeWeatherDetails } from "./dom.js";

getWeatherData("new york").then(data => {
    const weatherObj = getWeatherObj(data);
    console.log(weatherObj);
})