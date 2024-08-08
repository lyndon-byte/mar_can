import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August'],
    datasets: [
      {
        label: 'visitors',
        data: [165, 1059, 880, 701, 420, 890, 500,0],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Marcan's visitors",
      },
    },
  };

  
  export default function LineChart(){

    return <Line data={data} options={options} />;

  };
  
  
  