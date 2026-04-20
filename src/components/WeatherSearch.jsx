import React, { useState } from 'react';

function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!city.trim()) {
      return;
    }
    onSearch(city.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Enter city name"
        aria-label="City name"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default WeatherSearch;
