import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { Line } from "react-chartjs-2";
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
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );

function App() {
  // Default placeholder sensor
  const [humiditySensors, setHumiditySensors] = useState([
    {sensorName: "No sensor", lastIndex: 3 ,sensorData: [
      {humidity: 0, atTime: 1668861128000},
      {humidity: 0, atTime: 1668861189000},
      {humidity: 0, atTime: 1668861304000},
      {humidity: 0, atTime: 1668877936000}
    ]}
  ]);

  const [statusMessage, setStatusMessage] = useState("OK!");
  const [sensorsList, setSensorsList] = useState([]);

  // Server connection
  const updateTime = 40000;
  const serverURL = "http://127.0.0.1:8080";
  const sensorsEndpoint = serverURL + "/sensors";
  const dataEndpoint = serverURL + "/sensors/humidity";

  // Get sensors list when the App renders
  useEffect(() => {
    setStatusMessage("Retrieving sensors list...");
    axios.get(sensorsEndpoint, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then((response) => {
      setSensorsList(response.data);
      setStatusMessage("OK! Sensors retrieved");
    });
  }, []);

  // Update the state of the sensors every <updateTime> ms
  useEffect(() => {
    const requestInterval = setInterval(() => {
    setStatusMessage("Retrieving sensors data...");
      axios.get(dataEndpoint, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        params: {
          sensorsIds : sensorsList[0]
        }
      }).then((response) => {
        let obj = response.data[sensorsList[0]];
        let sensorDataList = [];
        for (let i = 0; i < obj.length; i++) {
          let str = obj[i].split(',');
          sensorDataList.push({humidity: Number(str[1]), atTime: Number(str[0])})
        }
        let newHumidity = {sensorName: sensorsList[0], lastIndex: obj.length - 1,
          sensorData: sensorDataList
        }
        setHumiditySensors([newHumidity])
        setStatusMessage("OK! Humidity data retrieved");
      });
    }, updateTime);

    return () => clearInterval(requestInterval);
  })

  function epochToFormattedHour(epoch) {
    let myDate = new Date(epoch);
    return myDate.getHours() + ":" + myDate.getMinutes(); 
  }

  function getEpochListAsFormattedHourFromSensor(sensor) {
    let x = [];
    sensor.sensorData.forEach(element => {
      x.push(epochToFormattedHour(element.atTime))
    });
    return x;
  }

  function epochToFormattedDate(epoch) {
    let myDate = new Date(epoch);
    return myDate.getMonth() + 1 + "/" + myDate.getDate() + "/" + myDate.getFullYear() 
      + " - " + myDate.getHours() + ":" + myDate.getMinutes(); 
  }

  function getHumidityAsList(sensor) {
    let x = [];
    sensor.sensorData.forEach(element => x.push(element.humidity));
    return x;
  }

  function renderSensorData(humiditySensor) {
    if (humiditySensor === null) return;
    return (
      <div className="sensor-data-card">
        <div className="card text-bg-light mb-3">
          <div className="card-header">
            <h4>{humiditySensor.sensorName}</h4>
          </div>
          <div className="card-body">
            <h5>
                {humiditySensor.sensorData[humiditySensor.lastIndex].humidity}
            </h5>
            <p>
              <b>
                Last update: {epochToFormattedDate(
                humiditySensor.sensorData[humiditySensor.lastIndex].atTime)}
              </b>
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderSensorsList(humiditySensors) {
    return humiditySensors.map((sensor) => renderSensorData(sensor));
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary title">
        <a className="navbar-brand logo-text" href="/">
          <span className="material-symbols-outlined">
            sensors
          </span>
          hSensor
        </a>
      </nav>
      <div className="content-box">
        <h3>My sensors</h3>
          Last status: {statusMessage}
          <div className="sensors-list">
            {renderSensorsList(humiditySensors)}
          </div>
      </div>
      <div className="content-box">
        <h3>History</h3>
        <Line data={{
          labels: getEpochListAsFormattedHourFromSensor(humiditySensors[0]),
          datasets: [
            {
              label: humiditySensors[0].sensorName,
              data: getHumidityAsList(humiditySensors[0]),
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)"
            }
          ]
        }}
        width={1080}
        height={600}
        options={{maintainAspectRatio: true, responsive: false}}/>
      </div>
    </div>
  );
}

export default App;