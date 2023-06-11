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

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'SanShrimp Line Chart'
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true
      }
    },
    y: {
      display: true,
      title: {  
        display: true,
        text: 'Value'
      },
      // suggestedMin: -10,
      // suggestedMax: 200
    }
  }
};


const SanshrimpChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&appid=20ec6b44f4246937e3befcf4bfe33e08&cnt=16&units=metric&lang=vi'
      );
      if (res.data && res.data.list.length > 0) {
        let lstLabel = [];
        let lstData = [];
        // let lstLabel2 = [];
        let lstData2 = [];
        // let lstLabel3 = [];
        let lstData3 = [];
        // let lstLabel4 = [];
       let  lstData4 = [];
        console.log(res.data);
        for (let item of res.data.list) {
          lstLabel = [...lstLabel, item.dt_txt];
          lstData = [...lstData, item.main.temp];

          // lstLabel2 = [...lstLabel2, item.dt_txt];
          lstData2 = [...lstData2, item.wind.gust];

          // lstLabel3 = [...lstLabel3, item.dt_txt];
          lstData3 = [...lstData3, item.main.humidity];
          
          // lstLabel4 = [...lstLabel4, item.dt_txt];
          lstData4 = [...lstData4, item.main.feels_like];
        }
        setChartData([
          {
            label: 'pH',
            data: lstData,
            backgroundColor: '#2196F3',
            borderColor: '#2196F3',
            tension: 0.4
          },
          {
            label: 'DO',
            data: lstData2,
            backgroundColor: '#F44236',
            borderColor: '#F44236',
            tension: 0.4
          },
          {
            label: 'EC',
            data: lstData3,
            backgroundColor: '#FF00FF',
            borderColor: '#FF00FF',
            tension: 0.4
          },
          {
            label: 'Temp',
            data: lstData4,
            backgroundColor: '#FFCA29',
            borderColor: '#FFCA29',
            tension: 0.4
          },
        ]);
        setChartLabels(lstLabel);
        // setChartLabels(lstLabel2);
        // setChartLabels(lstLabel3);
        // setChartLabels(lstLabel4);

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

export default SanshrimpChartContainer;
