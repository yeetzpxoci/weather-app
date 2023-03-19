function changeCityName(newCityName) {
    document.getElementById("city-name").innerText = newCityName;
}

function changeWeatherDetails(newPrecipity, newHumidity, newWind) {
    document.getElementById("precipitation").innerText = newPrecipity;
    document.getElementById("humidity").innerText = newHumidity;
    document.getElementById("wind").innerText = newWind;
}

export { changeCityName, changeWeatherDetails };
