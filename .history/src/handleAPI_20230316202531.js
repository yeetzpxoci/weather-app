async function getWeatherData(cityName) {
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=42d9bbce104de377e00f785f9b102383&units=metric', { mode: 'cors' });
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


