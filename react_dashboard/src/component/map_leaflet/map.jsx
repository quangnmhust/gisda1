import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './map.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useContext } from 'react';
import { ApiContext } from '../../context/ApiProvider';
import axios from 'axios';

const position = [20.254405, 106.506895];

function GetIcon(status) {
  return L.icon({
    iconUrl: require('../../Assets/normal.png'),
    iconSize: [38, 38],
  });
}

const Mapleaflet = () => {
  const [markers, setMarkers] = useState([]);
  const { getChartData } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await fetch('http://sanslab1.ddns.net:5002/api/device/get/API_key');
        const data3 = await response3.json();
        console.log(data3);

        var markerData = [];
        if (data3 != null) {
          data3.API_key.forEach((device) => {
            markerData.push({
              id: device.API_key,
              lat: device.lat,
              lon: device.lon,
            });
          });
        }
        setMarkers(markerData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = async (id, num_data) => {
    console.log('API:' + id);
    await getChartData(id, num_data);
  };

  const handleMarkerPopup = async (id) => {
    console.log('Popup:' + id);
  };

  
  return (
    <MapContainer center={position} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lon]}
          icon={GetIcon(marker.id)}
          eventHandlers={{
            click: () => {
              handleMarkerClick(marker.id, 50);
            },
            mouseover: () => handleMarkerPopup(marker.id),
          }}
        >
          <Popup>
            <h5>{marker.id}</h5>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default Mapleaflet;
