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

const options = {
  responsive: true,
  plugins: {
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
    }
  }
};


const SanshrimpChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  

  const getData = async () => {
    try {
      const res = await axios.get('http://sanslab1.ddns.net:5001/api/device/data/sensors');
        if (res.data && res.data.data.length > 0) {
        let lstLabel = [];
        let lstData = [];
        let lstData2 = [];
        let lstData3 = [];
        let  lstData4 = [];
        console.log(res.data);
        for (let item of res.data.data) {
        
          lstLabel = [...lstLabel, item.time_to_sever];
          lstData = [...lstData, item.pH];
          lstData2 = [...lstData2, item.EC];
          lstData3 = [...lstData3, item.DO];
          lstData4 = [...lstData4, item.Temp];

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
