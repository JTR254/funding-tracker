import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function FundingBarChart({ fundingData }) {
  const fundingByYear = fundingData.reduce((acc, item) => {
    acc[item.year] = (acc[item.year] || 0) + item.amount;
    return acc;
  }, {});

  const years = Object.keys(fundingByYear);
  const amounts = Object.values(fundingByYear);

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Total Funding ($)',
        data: amounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
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
      <h2>Total Funding by Year</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default FundingBarChart;