async function getWeatherInfo(city) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=colombia&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();

    const weatherInfo = {
        temperature: 123,
        weather: 123,
        humidity: 123,
        precip: 4,
        wind: 123,
        feelsLike: 123
    };

    console.log(weatherData);
}

getWeatherInfo();