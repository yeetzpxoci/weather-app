import { getWeatherData, getWeatherObj } from "./handleAPI.js";

console.log(getWeatherObj(await getWeatherData("london")));