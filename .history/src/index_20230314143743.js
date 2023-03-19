async function getWeatherInfo(city) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=london&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();

    const weatherInfo = {
        temperature: weatherData.main.temp,
        weather: weatherData.weather[0].main,
        humidity: main.humidity,
        if (weatherData.rain) {
            precip: weatherData.rain
        } else {
            precip: 0;
        }
        wind: 123,
        feelsLike: 123
    };
    console.log(weatherData);
}

getWeatherInfo();