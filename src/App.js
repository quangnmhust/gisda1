import React  from "react";
import './app.css'
import SideBar from "./Components/SideBar/SideBar";
import Body from "./Components/Body Selection/Body";



const App = () => {
  return (
    <div className='container'>
      <SideBar/>
      <Body />
    </div>
  )
}

export default App;