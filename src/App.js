import "./App.css";
import React, { useState } from "react";
import Search from "./components/search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import { WEATHER_API_URL } from "./api";
import { WEATHER_API_KEY } from "./api";
import Forecast from "./components/forecast/Forecast";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(currentWeather);
  console.log(forecastWeather);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {CurrentWeather && <CurrentWeather data={currentWeather} />}
      {Forecast && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
