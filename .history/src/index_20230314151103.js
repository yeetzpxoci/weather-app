function weatherInfo(temp, weather, humidity, precip, wind, feelsLike) {
    this.temp = temp;
    this.weather = weather,
    this.humidity = humidity,
    this.precip = precip,
    this.wind = wind,
    this.feelsLike = feelsLike;
}

async function getWeatherInfo(city) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=colombia&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();

    if (weatherData.rain) {
        const weatherDataObj = weatherInfo(weatherData.main.temp, weatherData.weather.main, weatherData.main.humidity,
        weatherData.rain["1h"], weatherData.getWeatherInfo, weatherData.wind.speed, weatherData.main.feelsLike);
        console.log(weatherDataObj.temp);
    } else {
        const weatherDataObj = weatherInfo(weatherData.main.temp, weatherData.weather.main, weatherData.main.humidity,
        weatherData.getWeatherInfo, weatherData.wind.speed, weatherData.main.feelsLike);
        console.log(weatherDataObj.temp);
    }
}

getWeatherInfo();