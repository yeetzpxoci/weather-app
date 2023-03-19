async function getWeatherData(city) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=42d9bbce104de377e00f785f9b102383', { mode: 'cors' });
    const weatherData = await response.json();
    return weatherData;
}

function getObj() {
    const weatherData = getWeatherData("colombia");
    console.log(weatherData);
}

getObj();

