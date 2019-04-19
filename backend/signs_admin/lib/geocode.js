const fetch = require('node-fetch')

function geocode(latitude, longitude) {
  const urlBase = 'http://api.postcodes.io/'
  const url = `${urlBase}postcodes?lat=${latitude}&lon=${longitude}`
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('geolocation failed')
      return response.json()
    })
    .then(data => {
      const result = data.result[0]
      return {
        postcode: result && result.postcode,
        parliamentaryConstituency: result && result.parliamentary_constituency
      }
    })
}

exports.geocode = geocode
