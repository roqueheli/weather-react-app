import { useState } from "react";
import './App.css';

function App() {
  let urlBase = `https://api.openweathermap.org/data/2.5/weather`;
  const API_KEY = "YOUR_API_KEY";
  const diffKelvin = 273.15;
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rs = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await rs.json();
      setWeatherData(data);
      setCity('');
    } catch (error) {
      console.log(error);
    }
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingresa una ciudad" value={city} onChange={handleCityChange}/>
        <button type="submit">Buscar</button>
      </form>
      {weatherData && (
        <div>
          <h2>{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
          <p>{`La temperatura actual es: ${Math.floor(weatherData.main.temp - diffKelvin)}° centígrados`}</p>
          <p>{`La condición meteorológica actual es: ${weatherData.weather[0].description}`}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
        </div>
      )}
    </div>
  );
}

export default App;
