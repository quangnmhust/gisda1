import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import axios from 'axios';

function GridStatus() {
    const [data, setData] = useState([])

  useEffect(() => {
    const DataGrid = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        console.log(res.data)
        setData(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    DataGrid()
  }, []);

  const columns = [
    { field: "userId", headerName: "userId", width: 20},
    { field: "id", headerName: "id", width: 20},
    { field: "title", headerName: "title", width: 150},
    { field: "completed", headerName: "completed", width: 50},
    
  ];

  const rows =  data.map((row) => ({
        id: row.id,
        userId: row.userId,
        title: row.title,
        completed: row.completed,
  }))
    return(
        <div style={{height: 350, width:450}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={1}
                    pagePer={10}
                />
    </div>
    )
}   
export default GridStatus;