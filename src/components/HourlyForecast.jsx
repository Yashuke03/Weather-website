import React from 'react';
import { formatHour } from '../weatherUtils';

function HourlyForecast({ hours }) {
  if (!hours?.length) {
    return null;
  }

  return (
    <section className="card">
      <h2>Hourly Forecast (Next 24 Hours)</h2>
      <div className="forecast-scroll">
        {hours.map((hour) => (
          <div key={hour.time} className="forecast-item">
            <p>{formatHour(hour.time)}</p>
            <p className="icon" role="img" aria-label={hour.description}>
              {hour.icon}
            </p>
            <p>{Math.round(hour.temperature)}°C</p>
            <p className="small-text">{hour.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;
