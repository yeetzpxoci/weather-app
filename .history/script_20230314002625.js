async function getWeatherInfo(city) {
    const weatherInfo = {
        temperature: "",
        wheels: 4,
        engine: { cylinders: 4, size: 2.2 },
    };

    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);
}

getWeatherInfo();