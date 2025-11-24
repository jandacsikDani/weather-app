import City from './components/city/City'
import Forecast from './components/forecast/Forecast';
import Chart from './components/chart/Chart';
import SearchModal from './components/searchModal/SearchModal';
import './App.css'
import { useState } from 'react';
import type { City as CityType } from './models/City';

function App() {
  const [city, setCity] = useState<CityType | null>(() => {
    const saved = localStorage.getItem("selectedCity");
    return saved ? JSON.parse(saved) : null;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem("selectedCity");
    return saved ? false : true;
  });

  function handleClose(city: CityType | null){
    setCity(city);
    setIsModalOpen(false);
    console.log(city);
  }



  return (
    <>
      <div className='app-container'>
        <div>
          <City city={city} onOpenModal={() => setIsModalOpen(true)}></City>
            {isModalOpen && <SearchModal onClose={handleClose}/>}
          <div className='search-container'>
          </div>
        </div>
        <div className='forcast-container'>
          <div>
            <Forecast city={city}></Forecast>
            <Chart city={city}></Chart>
          </div>
          <div id='creatorName'>Jandácsik Dániel</div>
        </div>
      </div>
    </>
  )
}

export default App;
