async function getWeatherData(city) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();
    return weatherData;
}

function getWeatherObj() {
    getWeatherData("colombia").then(data => {
        const weatherObj = {
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            weather: data.weather.main,
            precip: 0
        }
        return weatherObj;
    })
}

getWeatherObj();

