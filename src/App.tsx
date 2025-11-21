import City from './components/city/City'
import Forecast from './components/forecast/Forecast';
import Chart from './components/chart/Chart';
import './App.css'
import { useState } from 'react';
import type { City as CityType } from './models/City';

function App() {
  const [city, setCity] = useState<CityType | null>(() => {
    const saved = localStorage.getItem("selectedCity");
    return saved ? JSON.parse(saved) : null;
  });



  return (
    <>
      <div className='app-container'>
        <div>
          <City setCity={setCity}></City>
        </div>
        <div className='forcast-container'>
          <Forecast city={city}></Forecast>
          <Chart city={city}></Chart>
        </div>
      </div>
    </>
  )
}

export default App;
