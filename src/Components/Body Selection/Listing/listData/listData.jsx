import { useEffect, useState } from "react";
import axios from 'axios';

function Listdata() {
    const [data, setData] = useState([])

  useEffect(() => {
    const DataGrid = async () => {
      try {
        const res = await axios.get(
          'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=NBRC8I6122DWDIVO'
        )
        console.log(res.data)
        setData(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    DataGrid()
  }, []);
    return(
        <div></div>
    )
}   
export default Listdata;