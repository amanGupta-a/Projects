const API_KEY = "fc5ddfe979b61ad096950bb306a6dcaa";
const weatherDiv = document.getElementById("weather");

function fetchWeather(lat, lon) {
  console.log("📦 Fetching weather for:", lat, lon);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log("🌐 Request URL:", url);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("✅ API Response:", data);
      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(err => {
      console.error("❌ Error fetching weather:", err.message);
      weatherDiv.innerHTML = `<p>Failed to fetch weather data. Error: ${err.message}</p>`;
    });
}

function getLocationAndWeather() {
  if (!navigator.geolocation) {
    console.warn("❗ Geolocation not supported");
    weatherDiv.innerHTML = "Geolocation is not supported by this browser.";
    return;
  }

  console.log("📍 Requesting location access...");
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log("📍 Got position:", position.coords);
      fetchWeather(position.coords.latitude, position.coords.longitude);
    },
    error => {
      console.error("❌ Location error:", error.message);
      weatherDiv.innerHTML = "Location access denied or not available.";
    }
  );
}

getLocationAndWeather();
