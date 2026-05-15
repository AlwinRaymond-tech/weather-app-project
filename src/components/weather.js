import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async () => {

    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {

      setLoading(true);
      setError('');

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);

    } catch (err) {

      setWeather(null);
      setError('City not found');

    } finally {

      setLoading(false);

    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="weather-container">

      <div className="weather-card">

        <h1>Weather Report</h1>

        <p className="subtitle">
          Search any city for live conditions
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={getWeather}>
            Search
          </button>

        </div>

        {loading && (
          <p className="loading">Loading...</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        {weather && (

          <div className="weather-info">

            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather"
            />

            <h3>
              {Math.round(weather.main.temp)}°C
            </h3>

            <p className="description">
              {weather.weather[0].description}
            </p>

            <div className="details">

              <div className="detail-card">
                <span>Humidity</span>
                <strong>{weather.main.humidity}%</strong>
              </div>

              <div className="detail-card">
                <span>Wind Speed</span>
                <strong>{weather.wind.speed} m/s</strong>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Weather;