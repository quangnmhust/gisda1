import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Hidden } from '@mui/material';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);
const LineChart = ({ listLabel, listData, min_data }) => {
  console.log(listLabel, listData, min_data);
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: min_data,
        ticks: {
          callback: (value) => value,
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  return (
    <Line
      options={options}
      data={{ labels: listLabel, datasets: listData }}
      style={{ width: '100%', height: '100%', overflow: Hidden }}
    />
  );
};
export default LineChart;
