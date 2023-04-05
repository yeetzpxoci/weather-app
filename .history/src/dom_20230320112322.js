import { getDays } from "./converter";

const cityName = document.getElementById("city-name");
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const celsiusConverterButton = document.getElementById("celsius-converter");
const fahrenheitConverterButton = document.getElementById("fahrenheit-converter");
const degree = document.getElementById("degree");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

function changeCityName(newCityName) {
    cityName.innerText = newCityName;
}

function changeWeatherDetails(newTemp, newPrecipity, newHumidity, newWind, newIcon) {
    degree.innerText = newTemp;
    precipitation.innerText = newPrecipity + "%";
    humidity.innerText = newHumidity + "%";
    wind.innerText = newWind;
    document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + newIcon + "@2x.png";
}

function changeDailyWeatherDetails(weatherArray){
    const days = document.querySelectorAll(".day");
    const icons = document.querySelectorAll(".weather-icon-daily");
    const degrees = document.querySelectorAll(".degree-daily");
    const dayNames = getDays();

    for (let i = 0; i < days.length; i++) {
        days[i].innerText = dayNames[i];
        icons[i].src = "https://openweathermap.org/img/wn/" + weatherArray[i].icon.slice(0, -1) + 'd' + "@2x.png";
        console.log(weatherArray[i].icon)
        degrees[i].innerText = weatherArray[i].temp + '°';
    }
}

searchForm.onsubmit = function () { return false };

searchButton.addEventListener("click", function () {
    const location = searchBar.value;
    getLocationData(location).then(locationData => {
        changeCityName(locationData[0].name);
        console.log(locationData);
        getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
            const weatherObj = getWeatherObj(weatherData.list[0]);
            console.log(weatherData);
            changeWeatherDetails(weatherObj.temp, weatherObj.precip, weatherObj.humidity, weatherObj.wind, weatherObj.icon);
            const weatherArray = getWeatherArray(weatherData.list);
            changeDailyWeatherDetails(weatherArray);
        })
    })
})

celsiusConverterButton.addEventListener("click", function () {
    if (!celsius) {
        celsiusConverter.style.color = "white";
        fahrenheitConverter.style.color = "rgb(208, 208, 208)";
        degree.innerText = fahrenheitToCelsius(parseInt(degree.innerText));
        celsius = true;
    }
})

fahrenheitConverterButton.addEventListener("click", function () {
    if (celsius) {
        celsiusConverter.style.color = "rgb(208, 208, 208)";
        fahrenheitConverter.style.color = "white";
        degree.innerText = celsiusToFahrenheit(parseInt(degree.innerText));
        celsius = false;
    }
})

export { changeCityName, changeWeatherDetails, changeDailyWeatherDetails };
