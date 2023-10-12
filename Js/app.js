const formId = document.getElementById('formCountry');


const getGeoData = async (city) => {
  try {
    const firstData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},ar&limit=5&appid=c254dde7ee55ef9170dcb20399e894d1`);
    const finalData = await firstData.json();
    return finalData[0];
  } catch (error) {
    console.log(error)
    alert('No se pudo encontrar esta ciudad')
  }
}

const printDataLenLat = async (x) => {
  const cityData = await getGeoData(x);
  const dataParaph = document.getElementById('dataP');
  if (cityData !== undefined) {
    const { lat, lon, state, name } = cityData;
    dataParaph.innerHTML = `Ciudad: ${name} <br/> ${state ? `Provincia: ${state} <br/>` : ''} Latitud: ${lat} <br/> Longitud: ${lon}`
  } else return (alert('no se encontro esta ciudad'))
}

formId.addEventListener('submit', (e) => {
 e.preventDefault();
 const countryName = document.getElementById('countryInput').value.split(" ").join("");
 printDataLenLat(countryName)
}, false);
