import { getWeatherData, getWeatherObj } from "./handleAPI.js";

console.log(getWeatherObj(getWeatherData("london")));