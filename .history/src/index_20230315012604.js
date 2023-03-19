import {getWeatherData, getWeatherObj} from "./handleAPI.js";

getWeatherData("london").then(data => {
    const weatherObj = getWeatherObj(data);
    console.log(weatherObj);
})