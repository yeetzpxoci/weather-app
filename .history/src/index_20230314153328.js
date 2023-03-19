async function getWeatherData(city) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();
    const weatherInfo = {
        temp: weatherData.main.temp,
        weather: weatherData.weather.main,
        humidity: weatherData.main.humidity,
        precip: 0,
        wind: weatherData.wind.speed,
        feelsLike: weatherData.main.feelsLike
    }
        weather(weatherData.main.humidity, 0, weatherData.wind.speed, weatherData.main.feelsLike)
    console.log(weatherInfo)
    return weatherInfo;
}

const weatherData = getWeatherData("colombia");
