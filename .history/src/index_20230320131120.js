import { getLocationData, getWeatherData, getWeatherObj, getWeatherArrayDaily } from "./handleAPI.js";
import { changeCityName, changeBackground, changeWeatherDetails, changeDailyWeatherDetails } from "./dom.js";

// default weather Amsterdam
getLocationData("Amsterdam").then(locationData => {
    changeCityName(locationData[0].name);
    console.log(locationData);
    getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
        const firstDay = getWeatherObj(weatherData.list[0]);
        changeWeatherDetails(firstDay.temp, firstDay.weather, firstDay.precip, firstDay.humidity, firstDay.wind, firstDay.icon);
        changeBackground(firstDay.weather);
        const weatherArray = getWeatherArrayDaily(weatherData.list);
        changeDailyWeatherDetails(weatherArray);
    })
}) 












