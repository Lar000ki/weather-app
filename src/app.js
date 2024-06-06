import React from 'react';
import WeatherChart from './weatherchart';
import './app.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Погода в Санкт-Петербурге</h1>
        <WeatherChart />
      </header>
    </div>
  );
}

export default App;
