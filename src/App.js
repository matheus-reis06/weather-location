import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false); //Aprovará o usuário de fornecer a sua localização
  const [weather, setWeather] = useState(false);  //Guarda dados da API

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])
  if (location == false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
    )
  } else if (weather == false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Humidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }
}
/*pega a api com o fetch que captura os dados do Json e 
manipula esses dados com o evento click e mostra os planetas*/
export default App;