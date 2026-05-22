import axios from "axios";
import { useState } from "react";
import "./weather.css";

function Weather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [background, setBackground] = useState(
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000"
  );

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const changeBackground = (condition) => {

    const weatherType = condition.toLowerCase();

    if (weatherType.includes("clear")) {
      setBackground(
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2000"
      );
    }

    else if (weatherType.includes("rain")) {
      setBackground(
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000"
      );
    }

    else if (weatherType.includes("cloud")) {
      setBackground(
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000"
      );
    }

    else if (
      weatherType.includes("mist") ||
      weatherType.includes("haze") ||
      weatherType.includes("fog")
    ) {
      setBackground(
        "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2000"
      );
    }
  };

  const getWeather = async () => {

    try {

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric"
          }
        }
      );

      const data = response.data;

      setWeather(data);
      changeBackground(data.weather[0].main);

      setCity("");

    } catch {
      alert("City not found");
    }
  };

  return (

    <div
      className="weather-page"
      style={{
        backgroundImage: `url(${background})`
      }}
    >

      <div className="search-container">

        <input
          placeholder="Search city..."
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }

          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
        />

        <button onClick={getWeather}>
          🔍
        </button>

      </div>

      {weather && (

        <>

          <div className="main-weather">

            <h1>{weather.name}</h1>

            <h2>
              {Math.round(weather.main.temp)}°C
            </h2>

            <p>
              {weather.weather[0].description}
            </p>

          </div>

          <div className="chip-container">

            <div className="chip">
              Real Feel {Math.round(weather.main.feels_like)}°C
            </div>

            <div className="chip">
              Humidity {weather.main.humidity}%
            </div>

            <div className="chip">
              Highest Temp {Math.round(weather.main.temp_max)}°C
            </div>

            <div className="chip">
              Lowest Temp {Math.round(weather.main.temp_min)}°C
            </div>

            <div className="chip">
              Wind Speed {weather.wind.speed} m/s
            </div>

            <div className="chip">
              Wind Direction {weather.wind.deg || 0}°
            </div>

            <div className="chip">
              Visibility {weather.visibility / 1000} km
            </div>

            <div className="chip">
              Pressure {weather.main.pressure} hPa
            </div>

            <div className="chip">
              Sunrise {
                new Date(weather.sys.sunrise * 1000)
                .toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }
            </div>

            <div className="chip">
              Sunset {
                new Date(weather.sys.sunset * 1000)
                .toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }
            </div>

          </div>

        </>

      )}

    </div>
  );
}

export default Weather;