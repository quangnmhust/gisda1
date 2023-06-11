import axios from 'axios';
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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const labels = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

git;

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'pH',
//       data: [32, 42, 51, 60, 51, 95, 45, 23],
//       backgroundColor: '#2196F3',
//       borderColor: '#2196F3',
//     },
//     {
//       label: 'DO',
//       data: [37, 42, 41, 37, 31, 44],
//       backgroundColor: '#F44236',
//       borderColor: '#F44236',
//     },
//     {
//       label: 'EC',
//       data: [96, 88, 25, 35, 17, 69],
//       backgroundColor: '#FF00FF',
//       borderColor: '#FF00FF',
//     },
//     {
//       label: 'Temp',
//       data: [60, 54, 54, 28, 27, 49],
//       backgroundColor: '#FFCA29',
//       borderColor: '#FFCA29',
//     },
//   ],
// };

const ChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast?q=London%2Cus&mode=json&appid=20ec6b44f4246937e3befcf4bfe33e08&cnt=10'
      );
      if (res.data && res.data.list.length > 0) {
        let lstLabel = [];
        let lstData = [];
        for (let item of res.data.list) {
          lstLabel = [...lstLabel, item.dt_txt];
          lstData = [...lstData, item.main.temp];
        }
        setChartData([
          {
            label: 'Nhiệt độ',
            data: lstData,
            backgroundColor: '#2196F3',
            borderColor: '#2196F3',
          },
        ]);
        setChartLabels(lstLabel);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ width: 700, height: 400 }}>
      <Line
        options={options}
        data={{ labels: chartLabels, datasets: chartData }}
      />
    </div>
  );
};

export default ChartContainer;
