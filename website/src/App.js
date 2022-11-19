import { useState } from "react";
import './App.css';

function App() {
  const [humiditySensors, setHumiditySensors] = useState([
    {sensorName: "Humidity", lastIndex: 3 ,sensorData: [
      {humidity: 10, atTime: 1668861128000},
      {humidity: 23, atTime: 1668861189000},
      {humidity: 34, atTime: 1668861304000},
      {humidity: 50, atTime: 1668877936000}
    ]}
  ]);
  
  function epochToFormattedHour(epoch) {
    let myDate = new Date(epoch);
    return myDate.getHours() + ":" + myDate.getMinutes(); 
  }

  function epochToFormattedDate(epoch) {
    let myDate = new Date(epoch);
    return myDate.getMonth() + 1 + "/" + myDate.getDate() + "/" + myDate.getFullYear() 
      + " - " + myDate.getHours() + ":" + myDate.getMinutes(); 
  }

  function renderSensorData(humiditySensor) {
    return (
      <div className="sensor-data-card">
        <div className="card text-bg-light mb-3">
          <div className="card-header">
            <h4>{humiditySensor.sensorName}</h4>
          </div>
          <div className="card-body">
            <p>
              <h5>
                {humiditySensor.sensorData[humiditySensor.lastIndex].humidity}
              </h5>
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
          <span class="material-symbols-outlined">
            sensors
          </span>
          hSensor
        </a>
      </nav>
      <div className="content-box">
        <h3>My sensors</h3>
          <div className="sensors-list">
            {renderSensorsList(humiditySensors)}
          </div>
      </div>
      <div className="content-box">
        <h3>History</h3>
      </div>
    </div>
  );
}

export default App;