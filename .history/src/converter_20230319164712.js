function celsiusToFahrenheit(celsius) {
    return Math.round(celsius * 1.8 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) / 1.8);
}

function getDayName() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayIndex = today.getDay();
    const dayName = daysOfWeek[dayIndex];
    return dayName;
}

export { celsiusToFahrenheit, fahrenheitToCelsius, getDayName }