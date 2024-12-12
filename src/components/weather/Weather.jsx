import React, { useEffect, useState } from "react";
import "./weather.css";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=6ef56b7ca1bd45489c7200458240112&q=Boston&aqi=no`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <div className="weather-error">Error: {error}</div>;
  }

  if (!weather) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  return (
    <div className="weather">
      <h2>Weather Report</h2>
      <p>Location: {weather.location.name}, {weather.location.region}</p>
      <p>Temperature: {weather.current.temp_c}°C</p>
      <p>Condition: {weather.current.condition.text}</p>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
    </div>
  );
};

export default Weather;
