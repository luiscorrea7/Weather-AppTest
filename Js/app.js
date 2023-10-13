const formId = document.getElementById('formCountry');

const API_KEY = 'c254dde7ee55ef9170dcb20399e894d1';

/**
 *  Ejecuta una petición a la API de geolocalización para obtener los datos de latitud y longitud,
 *  (el objeto obtenido cuenta con mas keys ademas que latitud o longitud pero no son necesarios para seguir con la logica).
 *
 * @param {string} city - Recibe la ciudad.
 * @returns {object} Devuelve un objeto con los datos de la ciudad ingresada.
 */

const getGeoData = async (city) => {
  try {
    const firstData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},ar&limit=1&appid=${API_KEY}`);
    const finalData = await firstData.json();
    return finalData[0];
  } catch (error) {
    console.log(error)
    alert('No se pudo encontrar esta ciudad')
  }
}

/**
 *  Recibe los datos del clima con la latitud y longitud obtenidas del objeto que retorna la funcion anterior.
 *  Desestructura las keys de latitud (lat) y longitud(lon) y retorna un objeto con la data lista para pintar en pantalla.
 *  Valida los datos ingresados en el formulario y prosigue con la segunda peticion al API del clima.
 *
 * @param {string} x - Recibe lo escrito en el input del formulario.
 * @returns {object} Devuelve un objeto con los datos del clima.
 */

const getWeatherData = async (x) => {
  const cityData = await getGeoData(x);
  if (cityData !== undefined) {
    try {
      const { lat, lon} = cityData;
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`);
      const finalData = await data.json();
      return finalData;
    } catch (error) {
      console.log(error)
    }
  } else {
    alert('no se encontraron resultados')
  }
}

//-- Pinta en pantalla los datos obtenidos anteriormente
const printData = async (x) => {
  const { name, main, weather, wind, visibility, clouds, timezone, coord } = await getWeatherData(x);
  const tempDiv = document.getElementById('tempDiv');
  const weatherDiv = document.getElementById('weatherDiv');
  const mapDiv = document.getElementById('mapFrame');

  tempDiv.innerHTML=`
  <h2>Temperatura</h2>
  <p class="fw-semibold fs-5">${name}</p>
  <h1 class="tempCounter">${main.temp}°</h1>
  <h3>Sensación Termica: ${main.feels_like}°</h3>
  <p class="fw-semibold">Min: ${main.temp_min}° Max: ${main.temp_max}°</p>
  <h4>Humedad: ${main.humidity}%</h4>
  `
  //--

  weatherDiv.innerHTML=`
  <h2>Clima</h2>
  <p class="fw-light">${weather[0].description.toUpperCase()}</p>
  <div class="iconDiv d-flex justify-content-center align-items-center">
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="icono del clima">
  </div>
  <h2 class="mt-3">Viento</h2>
  <p class="fw-semibold">Velocidad: ${wind.speed}m/s</p>
  <p class="fw-semibold">${wind.deg}°</p>
  <div class="windCircle d-flex justify-content-center align-items-center">
    <div class="windIndicator fw-bold" style="transform: rotate(${wind.deg}deg);">==></div>
  </div>
  `

  //--

  mapDiv.src=`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d890.3366265045021!2d${coord.lon}!3d${coord.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1697222972630!5m2!1ses-419!2sar`
}

//-- Evento del formulario el cual da comienzo a toda la logica
formId.addEventListener('submit', (e) => {
 e.preventDefault();
 const countryName = document.getElementById('countryInput').value.split(" ").join("+");

 printData(countryName);
}, false);

//---------- Test functions
// const getWeatherData = async () => {
//   try {
//     const data = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=4107,ar&units=metric&lang=es&appid=c254dde7ee55ef9170dcb20399e894d1');
//     const finalData = await data.json();
//     console.log(finalData)
//   } catch (error) {
//     console.log(error)
//   }
// }

/* const dataParaph = document.getElementById('dataP');
  if (cityData !== undefined) {
    const { lat, lon, state, name } = cityData;
    dataParaph.innerHTML = `Ciudad: ${name} <br/> ${state ? `Provincia: ${state} <br/>` : ''} Latitud: ${lat} <br/> Longitud: ${lon}`
  } else return (alert('no se encontro esta ciudad'))
*/