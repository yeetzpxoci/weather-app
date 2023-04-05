async function getLocationData(location) {
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const locationData = await response.json();
    return locationData;
}

async function getWeatherData(lat, lon) {
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=42d9bbce104de377e00f785f9b102383&units=metric', { mode: 'cors' });
    const weatherData = await response.json();
    return weatherData;
}

function getWeatherObj(data) {
    const weatherObj = {
        temp: Math.round(data.main.temp),
        weather: data.weather[0].main,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        precip: 0,
        icon: data.weather[0].icon
    }

    if (typeof data.rain !== 'undefined') {
        weatherObj.precip = data.rain["3h"];
    }

    return weatherObj;
}

function getWeatherArrayDaily(data) {
    let weatherArray = [data[0], data[8], data[16], data[24], data[32]].map(x => getWeatherObj(x));
    return weatherArray;
}

function getWeatherArrayHourly(data) {
    let weatherArray = [data[0], data[1], data[2], data[3], data[4]].map(x => getWeatherObj(x));
    return weatherArray;
}


export {getLocationData, getWeatherData, getWeatherObj, getWeatherArrayDaily, getWeatherArrayHourly};


