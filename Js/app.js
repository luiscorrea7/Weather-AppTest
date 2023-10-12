const getGeoData = async () => {
  try {
    const firstData = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=buenosaires&limit=5&appid=c254dde7ee55ef9170dcb20399e894d1')
    const finalData = await firstData.json()
    console.log(finalData[0].lat)
  } catch (error) {
    console.log(error)
  }
}

getGeoData();