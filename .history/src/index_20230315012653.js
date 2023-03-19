import {getWeatherData, getWeatherObj} from "./handleAPI.js";

getWeatherData("londonn").then(data => {
    const weatherObj = getWeatherObj(data);
    console.log(weatherObj);
})