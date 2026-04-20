import React from 'react';
import { formatDay } from '../weatherUtils';

function WeeklyForecast({ days }) {
  if (!days?.length) {
    return null;
  }

  return (
    <section className="card">
      <h2>5-Day Forecast</h2>
      <div className="weekly-grid">
        {days.map((day) => (
          <div key={day.date} className="forecast-item">
            <p>{formatDay(day.date)}</p>
            <p className="icon" role="img" aria-label={day.description}>
              {day.icon}
            </p>
            <p>{Math.round(day.temperature)}°C</p>
            <p className="small-text">{day.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeeklyForecast;
