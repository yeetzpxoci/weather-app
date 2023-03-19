async function getLocationData(location) {
    const location = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=42d9bbce104de377e00f785f9b102383&units=metric', { mode: 'cors' });
    const locationData = await response.json();
    return locationData;
}

async function getWeatherData(location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=42d9bbce104de377e00f785f9b102383&units=metric', { mode: 'cors' });
    const weatherData = await response.json();
    return weatherData;
}

function getWeatherObj(data) {
    const weatherObj = {
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        weather: data.weather[0].main,
        precip: 0
    }
    return weatherObj;
}


export {getWeatherData, getWeatherObj};


