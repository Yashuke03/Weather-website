# React Weather App

A simple weather application built with React functional components and hooks (`useState`, `useEffect`) using the Open-Meteo API.

## Features

- Current weather in metric units (°C)
- Manual city search
- Geolocation-based weather lookup
- Hourly forecast for next 24 hours
- 5-day forecast
- 24-hour temperature line chart
- Offline fallback using `localStorage`
- Loading and error handling states

## Project Structure

```text
Weather-app/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── weatherUtils.js
    └── components/
        ├── CurrentWeather.jsx
        ├── HourlyForecast.jsx
        ├── Loader.jsx
        ├── TemperatureChart.jsx
        ├── WeatherSearch.jsx
        └── WeeklyForecast.jsx
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```
# Weather-website
