import { getDays, celsiusToFahrenheit, fahrenheitToCelsius } from "./converter.js"; 
import { getLocationData, getWeatherData, getWeatherObj, getWeatherArray } from "./handleAPI.js"

const cityName = document.getElementById("city-name");
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const celsiusConverterButton = document.getElementById("celsius-converter");
const fahrenheitConverterButton = document.getElementById("fahrenheit-converter");
const degree = document.getElementById("degree");
const weather = document.getElementById("weather-description");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const thunderstormBackground = "https://rare-gallery.com/uploads/posts/380484-4k-wallpaper.jpg";
const rainBackground = "https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFpbiUyMGphcGFufGVufDB8fDB8fA%3D%3D&w=1000&q=80"; 
const snowBackground = "https://wallpaper.dog/large/10850424.jpg";
const clearBackground = "https://a-static.besthdwallpaper.com/buildings-of-tokyo-city-shot-on-sunny-day-wallpaper-5120x2880-92935_55.jpg";
const cloudBackground = "https://c1.wallpaperflare.com/preview/586/645/192/japan-sea-winter-road-hokkaido-sea-it-was-cloudy-weather.jpg";
let celsiusActive = true; 

function changeCityName(newCityName) {
    cityName.innerText = newCityName;
}

function changeBackground(weatherCondition) {
    const background = document.body.style.backgroundImage;
    switch (weatherCondition) {
        case "Thunderstorm":
            background = thunderstormBackground;
            break;
        case "Rain":
            background = rainBackground;
            break;
        case "Snow":
            background = snowBackground;
            break;
        case "Clear":
            background = clearBackground;
            break;
        case "Clouds":
            background = cloudBackground;
            break;
        default:
            background = clearBackground;
            break;
    }
}


function changeWeatherDetails(newTemp, newWeather, newPrecipity, newHumidity, newWind, newIcon) {
    degree.innerText = newTemp;
    weather.innerText = newWeather;
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
            changeWeatherDetails(weatherObj.temp, weatherObj.weather, weatherObj.precip, weatherObj.humidity, weatherObj.wind, weatherObj.icon);
            changeBackground(weatherObj.weather);
            const weatherArray = getWeatherArray(weatherData.list);
            changeDailyWeatherDetails(weatherArray);
        })
    })
})

celsiusConverterButton.addEventListener("click", function () {
    if (!celsiusActive) {
        // change daily degrees
        const days = document.querySelectorAll(".degree-daily");
        days.forEach(x => x.innerText = fahrenheitToCelsius(parseInt(x.innerText)) + '°');

        celsiusConverterButton.style.color = "white";
        fahrenheitConverterButton.style.color = "rgb(208, 208, 208)";

        // change main degree
        degree.innerText = fahrenheitToCelsius(parseInt(degree.innerText));

        celsiusActive = true;
    }
})

fahrenheitConverterButton.addEventListener("click", function () {
    if (celsiusActive) {
        const days = document.querySelectorAll(".degree-daily");
        days.forEach(x => x.innerText = celsiusToFahrenheit(parseInt(x.innerText)) + '°');

        celsiusConverterButton.style.color = "rgb(208, 208, 208)";
        fahrenheitConverterButton.style.color = "white";

        degree.innerText = celsiusToFahrenheit(parseInt(degree.innerText));

        celsiusActive = false;
    }
})

export { changeCityName, changeWeatherDetails, changeDailyWeatherDetails };
