import React, { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Loader from './components/Loader';
import TemperatureChart from './components/TemperatureChart';
import WeatherSearch from './components/WeatherSearch';
import WeeklyForecast from './components/WeeklyForecast';
import { getWeatherInfo } from './weatherUtils';

const CACHE_KEY = 'weather-app-cache';

async function fetchCoordinatesByCity(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch city coordinates.');
  }

  const data = await response.json();
  if (!data.results?.length) {
    throw new Error('City not found.');
  }

  const location = data.results[0];
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    name: `${location.name}${location.country ? `, ${location.country}` : ''}`
  };
}

async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,weather_code',
    hourly: 'temperature_2m,weather_code',
    daily: 'temperature_2m_max,weather_code',
    forecast_days: '5',
    timezone: 'auto'
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Unable to fetch weather data.');
  }

  return response.json();
}

function mapWeatherData(apiData, locationName) {
  const currentInfo = getWeatherInfo(apiData.current.weather_code);

  const hourly = apiData.hourly.time.slice(0, 24).map((time, index) => {
    const info = getWeatherInfo(apiData.hourly.weather_code[index]);
    return {
      time,
      temperature: apiData.hourly.temperature_2m[index],
      description: info.description,
      icon: info.icon
    };
  });

  const weekly = apiData.daily.time.slice(0, 5).map((date, index) => {
    const info = getWeatherInfo(apiData.daily.weather_code[index]);
    return {
      date,
      temperature: apiData.daily.temperature_2m_max[index],
      description: info.description,
      icon: info.icon
    };
  });

  return {
    current: {
      temperature: apiData.current.temperature_2m,
      description: currentInfo.description,
      icon: currentInfo.icon,
      locationName
    },
    hourly,
    weekly
  };
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offlineMessage, setOfflineMessage] = useState('');
  const [locationDenied, setLocationDenied] = useState(false);

  const loadWeatherByCoordinates = async (latitude, longitude, locationName) => {
    setLoading(true);
    setError('');
    setOfflineMessage('');

    try {
      const apiData = await fetchWeather(latitude, longitude);
      const mapped = mapWeatherData(apiData, locationName);
      setWeatherData(mapped);
      localStorage.setItem(CACHE_KEY, JSON.stringify(mapped));
    } catch (requestError) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setWeatherData(JSON.parse(cached));
        setOfflineMessage('Showing offline data');
      } else {
        setError(requestError.message || 'Failed to fetch weather data.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (city) => {
    setError('');
    try {
      const coordinates = await fetchCoordinatesByCity(city);
      await loadWeatherByCoordinates(coordinates.latitude, coordinates.longitude, coordinates.name);
    } catch (searchError) {
      setError(searchError.message || 'Unable to search city.');
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationDenied(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await loadWeatherByCoordinates(latitude, longitude, 'Current Location');
      },
      () => {
        setLocationDenied(true);
      }
    );
  }, []);

  return (
    <main className="app-container">
      <h1>React Weather App</h1>

      <WeatherSearch onSearch={handleCitySearch} />

      {locationDenied && (
        <p className="info-message">Location access denied. Please search for a city manually.</p>
      )}

      {offlineMessage && <p className="info-message">{offlineMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {loading && <Loader />}

      {!loading && weatherData && (
        <div className="weather-content">
          <CurrentWeather data={weatherData.current} />
          <HourlyForecast hours={weatherData.hourly} />
          <TemperatureChart hours={weatherData.hourly} />
          <WeeklyForecast days={weatherData.weekly} />
        </div>
      )}
    </main>
  );
}

export default App;
