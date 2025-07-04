import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function InvestmentChart({ data }) {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Investment Value',
        data: data.map(item => item.value),
        fill: false,
        backgroundColor: '#4bc0c0',
        borderColor: '#4bc0c0',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Investment Performance',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default InvestmentChart;
