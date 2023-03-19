async function getWeatherInfo(city) {
    const weatherInfo = {
        temperature: "",
        wheels: 4,
        engine: { cylinders: 4, size: 2.2 },
    };

    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=fbf5c2f3e6f04964833232225231303&q=Nijmegen', { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);
}

getWeatherInfo();