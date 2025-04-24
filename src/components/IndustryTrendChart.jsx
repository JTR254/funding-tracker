import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

function IndustryTrendChart({ fundingData }) {
  const groupedData = fundingData.reduce((acc, item) => {
    if (!acc[item.industry]) acc[item.industry] = {};
    acc[item.industry][item.year] = (acc[item.industry][item.year] || 0) + item.amount;
    return acc;
  }, {});

  const years = [...new Set(fundingData.map((item) => item.year))].sort();
  const datasets = Object.keys(groupedData).map((industry) => ({
    label: industry,
    data: years.map((year) => groupedData[industry][year] || 0),
    fill: false,
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    tension: 0.4,
  }));

  const data = {
    labels: years,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // Move legend to the bottom
        labels: {
          color: '#d3d3d3', // Brighter gray for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#d3d3d3', // Brighter gray for x-axis labels
        },
      },
      y: {
        ticks: {
          color: '#d3d3d3', // Brighter gray for y-axis labels
        },
      },
    },
  };

  return (
    <div>
      <h2>Funding Trends by Industry</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default IndustryTrendChart;