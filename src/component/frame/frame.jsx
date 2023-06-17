import React from "react";
import '../frame/frame.scss';

import pH from '../../Assests/pH.png';
import DO from '../../Assests/DO.png';
import EC from '../../Assests/EC.png';
import temp from '../../Assests/temp.png';

const FrameDetail = () => {
  return (
    <div className="listingSeclection">
      <div children="divDetails">
          <h1>Details</h1>
      </div>
      <div className="secContainer">
              {/* <Listdata /> */}
              <div className="singleItem">
                <img className="imgPH" src={pH} alt="pH"/>
                <h2 id="pHValue">12</h2>
                <h3>pH</h3>
              </div>       

              <div className="singleItem">
                <img className="imgDO" src={DO} alt="pH"/>
                <h2 id="DOValue">23</h2>
                <h3>mg/L</h3>
              </div>

              <div className="singleItem">
                <img className="imgEC" src={EC} alt="pH"/>
                <h2 id="ECValue">25</h2>
                <h3>µS/cm</h3>
              </div>

              <div className="singleItem">
                <img className="imgTemp" src={temp} alt="Temp"/>
                <h2 id="TempValue">36</h2>
                <h3>°C</h3>
              </div>

            </div>
    </div>
  )
}

export default FrameDetail;