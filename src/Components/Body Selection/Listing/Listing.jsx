import React  from "react";
import '../Listing/listing.scss'


import {BsFillArrowRightCircleFill} from "react-icons/bs";
// import Listdata from "./listData/listData";

import axios from 'axios';
import { useEffect, useState } from 'react';



import pH from '../../../Assets/pH.png';
import DO from '../../../Assets/DO.png';
import EC from '../../../Assets/EC.png';
import temp from '../../../Assets/temp.png';
// import Listdata from "./listData/listData";

const Listing = () => {

  const [pHValue, setpHValue] = useState([]);
  const [DOValue, setDOValue] = useState([]);
  const [ECValue, setECValue] = useState([]);
  const [TempValue, setTempValue] = useState([]);


  const getData = async () => {
    try {
      const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=20ec6b44f4246937e3befcf4bfe33e08&units=metric&lang=vi'
        // 'http://sanslab1.ddns.net:5001/api/device/data/sensors'
      );
      // if (res.data && res.data.list.length > 0) {
        // if (res.data && res.data.length > 0) {
        console.log(res.data);
        // for (let item of res.data) {
        //   // console.log(item.DO);
        // }
        setpHValue(res.data.wind.speed);

        setDOValue(res.data.main.humidity);

        setECValue(res.data.main.feels_like);

        setTempValue(res.data.main.temp);

      // }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getData();
  //   }, 5 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    getData();
  }, []);

  return (

        <div className="listingSeclection">
          <div children="divDetails">
              {/* <Listdata /> */}
            <div className="heading flex">
              <h1>Details</h1>
              <button className="btn flex">
                See all <BsFillArrowRightCircleFill className="icon"/>
              </button>
            </div>

            <div className="secContainer flex">
              {/* <Listdata /> */}
              <div className="singleItem">
                <img className="imgPH" src={pH} alt="pH"/>
                <h2 id="pHValue">{pHValue}</h2>
                <h3>pH</h3>
              </div>       

              <div className="singleItem">
                <img className="imgDO" src={DO} alt="pH"/>
                <h2 id="DOValue">{DOValue}</h2>
                <h3>mg/L</h3>
              </div>

              <div className="singleItem">
                <img className="imgEC" src={EC} alt="pH"/>
                <h2 id="ECValue">{ECValue}</h2>
                <h3>µS/cm</h3>
              </div>

              <div className="singleItem">
                <img className="imgTemp" src={temp} alt="Temp"/>
                <h2 id="TempValue">{TempValue}</h2>
                <h3>°C</h3>
              </div>

            </div>
          </div>
        </div>

  )
}

export default Listing;