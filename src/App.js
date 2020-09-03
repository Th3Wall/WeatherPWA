import React, {useState} from 'react';
import { fetchWeather } from './api/fetchWeather.js';
import SearchIcon from '@material-ui/icons/Search';
import './App.css';


const App = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = async (e) => {
    if(e.key === 'Enter') {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery('');
    }
  }

  return (
    <div className="main-container">

      <h1>Weather PWA</h1>
      <h5>Courtesy of OpenWeather API</h5>
      <div className="search-wrp">
        <SearchIcon />
        <input type="text" className="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
      </div>
      {weather.main && (
          <div className="city">
              <h2 className="city-name">
                  <span>{weather.name}</span>
              </h2>
              <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <div className="city-temp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="city-minmax">
                <smaller>{Math.round(weather.main.temp_min)}<sup>&deg;</sup> / {Math.round(weather.main.temp_max)}<sup>&deg;</sup></smaller>
              </div>
          </div>
      )}
    </div>
  );
}

export default App;