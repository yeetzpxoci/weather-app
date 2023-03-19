function celsiusToFahrenheit(celsius) {
    return Math.round(celsius * 1.8 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) / 1.8);
}

function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

export { celsiusToFahrenheit, fahrenheitToCelsius, getDayName }