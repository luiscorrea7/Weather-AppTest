const formId = document.getElementById('formCountry');

//-- obtiene los datos (Latitud, Longitud) con la ciudad
const getGeoData = async (city) => {
  try {
    const firstData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},ar&limit=1&appid=c254dde7ee55ef9170dcb20399e894d1`);
    const finalData = await firstData.json();
    return finalData[0];
  } catch (error) {
    console.log(error)
    alert('No se pudo encontrar esta ciudad')
  }
}

//-- obtiene los datos del clima con la latitud y longitud
const getWeatherData = async (x) => {
  const cityData = await getGeoData(x);
  if (cityData !== undefined) {
    try {
      const { lat, lon} = cityData;
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=c254dde7ee55ef9170dcb20399e894d1`);
      const finalData = await data.json();
      console.log(finalData)
      return finalData;
    } catch (error) {
      console.log(error)
    }
  } else {
    alert('no se encontraron resultados')
  }
}

//-- Pinta en pantalla los datos obtenidos anteriormente
const printData = async () => {

}

//-- Evento del formulario el cual da comienzo a toda la logica
formId.addEventListener('submit', (e) => {
 e.preventDefault();
 const countryName = document.getElementById('countryInput').value.split(" ").join("");

 getWeatherData(countryName)
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