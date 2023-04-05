function celsiusToFahrenheit(celsius) {
    return Math.round(celsius * 1.8 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) / 1.8);
}

function getDays() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const result = [];

    for (let i = 0; i < 5; i++) {
        const day = daysOfWeek[(today.getDay() + i) % 7];
        result.push(day);
    }

    return result;
}

function getHours(WeatherArray) {
    let hourNames = []
}


export { celsiusToFahrenheit, fahrenheitToCelsius, getDays }