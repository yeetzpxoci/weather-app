function celsiusToFahrenheit(celsius) {
    return Math.round(celsius * 1.8 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) / 1.8);
}

function getDayName(dateStr) {
    var date = new Date(dateStr);
    return date.toLocaleDateString('en_us', { weekday: 'long' });
}

export { celsiusToFahrenheit, fahrenheitToCelsius, getDayName }