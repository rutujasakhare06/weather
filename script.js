async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found.");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const temp = weatherData.current.temperature_2m;
    const rain = weatherData.current.precipitation;
    const code = weatherData.current.weather_code;

    const weatherDescriptions = {
      0: "Clear sky ☀️",
      1: "Mainly clear 🌤️",
      2: "Partly cloudy ⛅",
      3: "Overcast ☁️",
      45: "Fog 🌫️",
      48: "Depositing rime fog 🌫️❄️",
      51: "Light drizzle 🌦️",
      53: "Moderate drizzle 🌧️",
      55: "Dense drizzle 🌧️",
      61: "Slight rain 🌧️",
      63: "Moderate rain 🌧️",
      65: "Heavy rain 🌧️",
      80: "Rain showers 🌦️",
      95: "Thunderstorm ⛈️",
      99: "Thunderstorm + hail ⛈️❄️",
    };

    const condition = weatherDescriptions[code] || "Unknown";

    document.getElementById("cityName").textContent = `${name}, ${country}`;
    document.getElementById("temp").textContent = `Temperature: ${temp}°C`;
    document.getElementById(
      "humidity"
    ).textContent = `Precipitation: ${rain} mm`;
    document.getElementById(
      "condition"
    ).textContent = `Condition: ${condition}`;
  } catch (error) {
    alert("Error fetching weather. Please try again later.");
    console.error(error);
  }
}
