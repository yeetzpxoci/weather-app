import { getDays, getHours, celsiusToFahrenheit, fahrenheitToCelsius } from "./converter.js"; 
import { getLocationData, getWeatherData, getWeatherObj, getWeatherArrayDaily, getWeatherArrayHourly } from "./handleAPI.js"

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
const dailyButton = document.getElementById("daily");
const hourlyButton = document.getElementById("hourly");
let currentBackground = document.getElementById("rain");
let celsiusActive = true; 
let dailyActive = true;
let activeSlide = 0;

function changeCityName(newCityName) {
    cityName.innerText = newCityName;
}

function changeBackground(weatherCondition) {
    const thunderstorm = document.getElementById("thunderstorm");
    const rain = document.getElementById("rain");
    const snow = document.getElementById("snow");
    const clear = document.getElementById("clear");
    const cloud = document.getElementById("cloud");

    switch (weatherCondition) {
        case "Thunderstorm":
            currentBackground.style.opacity = 0;
            thunderstorm.style.opacity = 1;
            currentBackground = thunderstorm;
            break;
        case "Rain":
            currentBackground.style.opacity = 0;
            rain.style.opacity = 1;
            currentBackground = rain;
            break;
        case "Snow":
            currentBackground.style.opacity = 0;
            snow.style.opacity = 1;
            currentBackground = snow;
            break;
        case "Clear":
            currentBackground.style.opacity = 0;
            clear.style.opacity = 1;
            currentBackground = clear;
            break;
        case "Clouds":
            currentBackground.style.opacity = 0;
            cloud.style.opacity = 1;
            currentBackground = cloud;
            break;
        default:
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

function showDailyWeatherDetails(weatherArray){
    const dayNames = getDays();

    const dailyWeatherContainer1 = document.createElement("div");
    dailyWeatherContainer1.classList.add("daily-weather-container");

    // create five child divs with class "daily-weather-info"
    for (let i = 0; i < 5; i++) {
        const dailyWeatherInfo = document.createElement("div");
        dailyWeatherInfo.classList.add("daily-weather-info");

        // create first child paragraph with class "day-hour"
        const dayHour = document.createElement("p");
        dayHour.classList.add("day-hour");
        dailyWeatherInfo.appendChild(dayHour);
        dayHour.innerText = dayNames[i];

        // create second child image with class "weather-icon-day-hour"
        const weatherIconDayHour = document.createElement("img");
        weatherIconDayHour.classList.add("weather-icon-day-hour");
        dailyWeatherInfo.appendChild(weatherIconDayHour);
        weatherIconDayHour.src = "https://openweathermap.org/img/wn/" + weatherArray[i].icon.slice(0, -1) + 'd' + "@2x.png";

        // create third child paragraph with child span with class "degree-day-hour"
        const degreeDayHour = document.createElement("p");
        const degreeSpan = document.createElement("span");
        degreeSpan.classList.add("degree-day-hour");
        degreeDayHour.appendChild(degreeSpan);
        dailyWeatherInfo.appendChild(degreeDayHour);
        degreeSpan.innerText = weatherArray[i].temp + '°';

        // append child divs to parent div
        dailyWeatherContainer1.appendChild(dailyWeatherInfo);
    }
    // append after slide left button so it is in the middle
    document.getElementById("slide-left").after(dailyWeatherContainer1);
}

function showHourlyWeatherDetails(weatherArray, hoursArray) {
    for (let i = 0; i < 3; i++) {
        const hourlyWeatherContainer = document.createElement("div");
        hourlyWeatherContainer.classList.add("hourly-weather-container");

        switch (i) {
            case 1:
                hourlyWeatherContainer.style.transform = "translate(2000px)"
                break;
            case 2:
                hourlyWeatherContainer.style.transform = "translateX(4000px)"
                break;
            default:
                break;
        }

        // create five child divs with class "hourly-weather-info"
        for (let j = 0; j < 5; j++) {
            const hourlyWeatherInfo = document.createElement("div");
            hourlyWeatherInfo.classList.add("hourly-weather-info");

            // create first child paragraph with class "day-hour"
            const dayHour = document.createElement("p");
            dayHour.classList.add("day-hour");
            hourlyWeatherInfo.appendChild(dayHour);
            dayHour.innerText = hoursArray[5 * i + j];

            // create second child image with class "weather-icon-day-hour"
            const weatherIconDayHour = document.createElement("img");
            weatherIconDayHour.classList.add("weather-icon-day-hour");
            hourlyWeatherInfo.appendChild(weatherIconDayHour);
            weatherIconDayHour.src = "https://openweathermap.org/img/wn/" + weatherArray[5 * i + j].icon.slice(0, -1) + 'd' + "@2x.png";

            // create third child paragraph with child span with class "degree-day-hour"
            const degreeDayHour = document.createElement("p");
            const degreeSpan = document.createElement("span");
            degreeSpan.classList.add("degree-day-hour");
            degreeDayHour.appendChild(degreeSpan);
            hourlyWeatherInfo.appendChild(degreeDayHour);
            degreeSpan.innerText = weatherArray[5 * i + j].temp + '°';

            // append child divs to parent div
            hourlyWeatherContainer.appendChild(hourlyWeatherInfo);
        }
        document.querySelector(".slide-container").insertBefore(hourlyWeatherContainer, document.getElementById("slide-right"));
    }
}

document.getElementById("slide-left").addEventListener("click", function () {
    const navPoints = document.querySelectorAll(".nav-point");
    navPoints.forEach(p => p.style.backgroundColor = "rgb(208, 208, 208)");

    const slides = document.querySelectorAll(".hourly-weather-container");
    
    switch (activeSlide) {
        case 0:
            slides[0].style.transform = "translateX(-4000px)"
            slides[1].style.transform = "translateX(-2000px)"
            slides[2].style.transform = "translateX(0px)"
            activeSlide = 2;
            break;
        case 1:
            slides[0].style.transform = "translateX(0px)"
            slides[1].style.transform = "translateX(2000px)"
            slides[2].style.transform = "translateX(4000px)"
            activeSlide = 0;
            break;
        case 2:
            slides[0].style.transform = "translateX(-2000px)"
            slides[1].style.transform = "translateX(0px)"
            slides[2].style.transform = "translateX(2000px)"
            activeSlide = 1;
            break;

        default:
            break;
    }

    navPoints[activeSlide].style.backgroundColor = "white";
});

document.getElementById("slide-right").addEventListener("click", function () {
    const navPoints = document.querySelectorAll(".nav-point");
    navPoints.forEach(p => p.style.backgroundColor = "rgb(208, 208, 208)");

    const slides = document.querySelectorAll(".hourly-weather-container");

    switch (activeSlide) {
        case 0:
            slides[0].style.transform = "translateX(-2000px)"
            slides[1].style.transform = "translateX(0px)"
            slides[2].style.transform = "translateX(2000px)"
            activeSlide = 1;
            break;
        case 1:
            slides[0].style.transform = "translateX(-4000px)"
            slides[1].style.transform = "translateX(-2000px)"
            slides[2].style.transform = "translateX(0px)"
            activeSlide = 2;
            break;
        case 2:
            slides[0].style.transform = "translateX(0px)"
            slides[1].style.transform = "translateX(2000px)"
            slides[2].style.transform = "translateX(4000px)"
            activeSlide = 0;
            break;

        default:
            break;
    }

    navPoints[activeSlide].style.backgroundColor = "white";
});


searchForm.onsubmit = function () { return false };

searchButton.addEventListener("click", function () {
    if (dailyActive) {
        document.querySelector(".daily-weather-container").remove();
    } else {
        document.querySelectorAll("hourly-weather-container").forEach(c => c.remove());
    }

    searchBar.setCustomValidity("");
    const location = searchBar.value;
    getLocationData(location).then(locationData => {
        if (locationData.length == 0) {
            searchBar.setCustomValidity("Please enter a valid city name");
            searchBar.reportValidity();
        } else {
            document.getElementById("city-name").style.opacity = 0;
            document.querySelector(".slide-container").style.opacity = 0;

            setTimeout(function () {
                changeCityName(locationData[0].name);
                document.getElementById("city-name").style.opacity = 1;
                document.querySelector(".slide-container").style.opacity = 1;
                console.log(locationData);
                getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
                    const weatherObj = getWeatherObj(weatherData.list[0]);
                    console.log(weatherData);
                    changeWeatherDetails(weatherObj.temp, weatherObj.weather, weatherObj.precip, weatherObj.humidity, weatherObj.wind, weatherObj.icon);
                    changeBackground(weatherObj.weather);
                    
                    if (dailyActive) {
                        const weatherArray = getWeatherArrayDaily(weatherData.list);
                        showDailyWeatherDetails(weatherArray);
                    } else {
                        const hoursArray = getHours(weatherData);
                        const weatherArray = getWeatherArrayHourly(weatherData.list);

                        showHourlyWeatherDetails(weatherArray, hoursArray);
                    }
                })
            }, 1000);
        }
    })
})

celsiusConverterButton.addEventListener("click", function () {
    if (!celsiusActive) {
        // change daily degrees
        const days = document.querySelectorAll(".degree-day-hour");
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
        const days = document.querySelectorAll(".degree-day-hour");
        days.forEach(x => x.innerText = celsiusToFahrenheit(parseInt(x.innerText)) + '°');

        celsiusConverterButton.style.color = "rgb(208, 208, 208)";
        fahrenheitConverterButton.style.color = "white";

        degree.innerText = celsiusToFahrenheit(parseInt(degree.innerText));

        celsiusActive = false;
    }
})

function disableSlideButtons() {
    document.getElementById("slide-left").pointerEvents = "none";
    document.getElementById("slide-right").pointerEvents = "none";
}

function enableSlideButtons() {
    document.getElementById("slide-left").pointerEvents = "auto";
    document.getElementById("slide-right").pointerEvents = "auto";
}

dailyButton.addEventListener("click", function () {
    document.querySelectorAll(".hourly-weather-container").forEach(c => c.remove());

    const currentLocation = document.getElementById("city-name").innerText;

    if (!dailyActive) {
        dailyActive = true;
        document.getElementById("daily").style.color = "white";
        document.getElementById("hourly").style.color = "rgb(208, 208, 208)";
        document.querySelector(".slide-container").style.opacity = 0;
        document.querySelector(".nav-point-container").style.opacity = 0;

        setTimeout(function () {
            getLocationData(currentLocation).then(locationData => {
                changeCityName(locationData[0].name);
                getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
                    const weatherArray = getWeatherArrayDaily(weatherData.list);
                    showDailyWeatherDetails(weatherArray);
                })
            })

            const slideLeft = document.getElementById("slide-left")
            const slideRight = document.getElementById("slide-right")

            slideLeft.style.opacity = 0;
            slideLeft.style.pointerEvents = "none";

            slideRight.style.opacity = 0;
            slideRight.style.pointerEvents = "none";

            disableSlideButtons();

            document.querySelector(".slide-container").style.opacity = 1;
        }, 1000);
        
    }
}) 

hourlyButton.addEventListener("click", function () {
    document.querySelector(".daily-weather-container").remove();

    const currentLocation = document.getElementById("city-name").innerText;

    if (dailyActive) {
        dailyActive = false;
        document.getElementById("daily").style.color = "rgb(208, 208, 208)";
        document.getElementById("hourly").style.color = "white";
        document.querySelector(".slide-container").style.opacity = 0;

        setTimeout(function () {
            getLocationData(currentLocation).then(locationData => {
                changeCityName(locationData[0].name);
                getWeatherData(locationData[0].lat, locationData[0].lon).then(weatherData => {
                    const hoursArray = getHours(weatherData);
                    const weatherArray = getWeatherArrayHourly(weatherData.list);
                    showHourlyWeatherDetails(weatherArray, hoursArray);
                })
            })
            
            document.querySelector(".nav-point-container").style.opacity = 1;   

            const slideLeft = document.getElementById("slide-left")
            const slideRight = document.getElementById("slide-right")

            slideLeft.style.opacity = 1;
            slideLeft.style.pointerEvents = "auto";

            slideRight.style.opacity = 1;
            slideRight.style.pointerEvents = "auto  ";

            enableSlideButtons();

            document.querySelector(".slide-container").style.opacity = 1;
        }, 1000);
    }
}) 

export { changeCityName, changeBackground, changeWeatherDetails, showDailyWeatherDetails };
