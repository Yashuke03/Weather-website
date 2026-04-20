import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatHour } from '../weatherUtils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function TemperatureChart({ hours }) {
  if (!hours?.length) {
    return null;
  }

  const chartData = {
    labels: hours.map((hour) => formatHour(hour.time)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hours.map((hour) => hour.temperature),
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.2)',
        borderWidth: 2,
        tension: 0.25,
        pointRadius: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { maxTicksLimit: 8 }
      }
    }
  };

  return (
    <section className="card">
      <h2>24-Hour Temperature Trend</h2>
      <Line data={chartData} options={options} />
    </section>
  );
}

export default TemperatureChart;
