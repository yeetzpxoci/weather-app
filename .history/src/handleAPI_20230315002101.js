async function getWeatherData(cityName) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();
    return weatherData;
}

function getWeatherObj(data) {
    const weatherObj = {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        weather: data.weather[0].main,
        precip: data.rain["1h"];
    }
    return weatherObj;
}

getWeatherData("new york").then(data => {
    const weatherObj = getWeatherObj(data);
    console.log(data);
    console.log(weatherObj);
})


