function weather(temp, weather, humidity, precip, wind, feelsLike) {
    this.temp = temp;
    this.weather = weather,
    this.humidity = humidity,
    this.precip = precip,
    this.wind = wind,
    this.feelsLike = feelsLike;
}

async function getWeatherData(city) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
}

const weatherData = getWeatherData("colombia");
// const weatherInfo = weather(weatherData.main.temp, weatherData.weather.main, weatherData.main.humidity, 0, weatherData.wind.speed,
    // weatherData.main.feelsLike)
