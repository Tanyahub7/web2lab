document.getElementById('get-weather-btn').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value;
  const apiKey = '56e44c3e4022ba198ddc35ad17704232'; // Замініть на ваш API-ключ

  if (city) {
    try {
      // Отримуємо координати міста
      const coordResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const coordData = await coordResponse.json();

      if (coordResponse.ok) {
        const lat = coordData.coord.lat;
        const lon = coordData.coord.lon;

        // Отримуємо дані погоди за координатами
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
          // Відображення інформації про погоду
          const weatherInfo = `
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Temperature:</strong> ${data.current.temp} °C</p>
            <p><strong>Weather:</strong> ${data.current.weather[0].description}</p>
          `;
          document.getElementById('weather-info').innerHTML = weatherInfo;
        } else {
          document.getElementById('weather-info').innerHTML = `<p>Weather data not available. Please try again later.</p>`;
        }
      } else {
        document.getElementById('weather-info').innerHTML = `<p>City not found. Please check the city name.</p>`;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    }
  } else {
    document.getElementById('weather-info').innerHTML = `<p>Please enter a city name</p>`;
  }
});
