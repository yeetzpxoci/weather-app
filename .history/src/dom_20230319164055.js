import { getDayName } from "./converter"; 

function changeCityName(newCityName) {
    document.getElementById("city-name").innerText = newCityName;
}

function changeWeatherDetails(newTemp, newPrecipity, newHumidity, newWind, newIcon) {
    document.getElementById("degree").innerText = newTemp;
    document.getElementById("precipitation").innerText = newPrecipity + "%";
    document.getElementById("humidity").innerText = newHumidity + "%";
    document.getElementById("wind").innerText = newWind;
    document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + newIcon + "@2x.png";
}

function changeDailyWeatherDetails(weatherArray){
    const days = document.querySelectorAll(".day");
    const icons = document.querySelectorAll(".weather-icon-daily");
    const degrees = document.querySelectorAll(".degree-daily");
    days.forEach(element => element.)
}

export { changeCityName, changeWeatherDetails, changeDailyWeatherDetails };
