import React from 'react';

function CurrentWeather({ data }) {
  if (!data) {
    return null;
  }

  return (
    <section className="card">
      <h2>Current Weather</h2>
      <div className="weather-row">
        <span className="icon" role="img" aria-label={data.description}>
          {data.icon}
        </span>
        <div>
          <p className="temperature">{Math.round(data.temperature)}°C</p>
          <p>{data.description}</p>
          <p className="location">{data.locationName}</p>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
