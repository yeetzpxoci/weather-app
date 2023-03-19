import {getWeatherData, getWeatherObj} from "./handleAPI.js";

getWeatherData("new york").then(data => {
    const weatherObj = getWeatherObj(data);
    console.log(weatherObj);
})