$(document).ready(function() {
    $('#weather-form').submit(function(event) {
        event.preventDefault();
        const city = $('#city-input').val();
        getWeather(city);
    });
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3446d1cfd90e485e82d205158240304&q=${city}&days=5&aqi=no&alerts=no`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Update current weather information
        $('#city-name').text(data.location.name);
        $('#city-region').text(data.location.region);
        $('#city-country').text(data.location.country);
        const date = new Date(data.location.localtime);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const time = date.toLocaleTimeString('en-US', { timeStyle: 'short' });
        $('#time').text(day + ' ' + time);
        $('#temperature').text(data.current.temp_f + '°F');
        $('#weather-description').attr('src', data.current.condition.icon.replace('//cdn.weatherapi.com/', ''));
        $('#humidity').text(data.current.humidity + '%');

        // Update forecast for the next 5 days
        const forecast = data.forecast.forecastday;
        for (let i = 0; i < forecast.length; i++) {
            const day = forecast[i];
            const date = new Date(day.date);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const maxTemp = day.day.maxtemp_f;
            const minTemp = day.day.mintemp_f;
            // getting the syntax right here took forever :(
            $(`#forecast-${i}`).html(`
                <p>${dayOfWeek}</p>
                <img src=${day.day.condition.icon.replace('//cdn.weatherapi.com/', '')} alt="Weather Icon">
                <p>Max Temp: ${maxTemp}°F</p>
                <p>Min Temp: ${minTemp}°F</p>
            `);
        }

        // Clear any previous error message
        $('#error-message').empty();

    } catch (error) {
        console.error('Error fetching weather data:', error);
        $('#error-message').text('Error fetching weather data: ' + error.message);
    }
}
