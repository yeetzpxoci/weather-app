async function getLocationData(location) {
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=57a52906e330f2708af427722131c01f&units=metric', { mode: 'cors' });
    const locationData = await response.json();
    return locationData;
}

async function getDailyWeatherData(lat, lon) {
    const response = await fetch('api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&appid=57a52906e330f2708af427722131c01f&units=metric', { mode: 'cors' });
    const weatherData = await response.json();
    return weatherData;
}

function getWeatherObj(data) {
    const weatherObj = {
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        weather: data.weather[0].main,
        precip: 0,
        icon: data.weather[0].icon
    }
    return weatherObj;
}


export {getLocationData, getHourlyWeatherData, getDailyWeatherData, getWeatherObj};


