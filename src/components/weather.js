import axios from "axios";
import { useState } from "react";
import "./weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    try {
      setError("");

      console.log("API KEY:", API_KEY);

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      setWeather(response.data);
    } catch (err) {
      console.log(err);

      setWeather(null);

      if (err.response?.status === 404) {
        setError("City not found");
      } else if (err.response?.status === 401) {
        setError("Invalid API key");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h1>Weather Report</h1>
        <p>Search any city for live conditions</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={getWeather}>Search</button>
        </div>

        {error && <div className="error">{error}</div>}

        {weather && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <h3>{Math.round(weather.main.temp)} °C</h3>

            <p>{weather.weather[0].description}</p>

            <div className="details">
              <span>Humidity: {weather.main.humidity}%</span>
              <span>Wind: {weather.wind.speed} km/h</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;