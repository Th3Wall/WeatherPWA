import React, {useState} from 'react';
import { fetchWeather } from './api/fetchWeather.js';
import SearchIcon from '@material-ui/icons/Search';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import './App.sass';


const App = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = async (e) => {
    if(e.key === 'Enter' && query) {
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
        <input type="text" className="search" placeholder="Search any city you want..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
      </div>

      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup className="city-name-sup">{weather.sys.country}</sup>
          </h2>
          <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="city-desc">
            <h5>{weather.weather[0].description}</h5>
          </div>
          <div className="city-minmax">
            <div className="min">
              <div className="city-minmax-icon">
                <ArrowDownwardIcon />
                <smaller>{Math.round(weather.main.temp_min)}<sup>&deg;</sup></smaller>
              </div>
              <div className="city-minmax-label">
                <p>Min.</p>
              </div>
            </div>
            <div className="max">
              <div className="city-minmax-icon">
                <ArrowUpwardIcon />
                <smaller>{Math.round(weather.main.temp_max)}<sup>&deg;</sup></smaller>
              </div>
              <div className="city-minmax-label">
                <p>Max.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;