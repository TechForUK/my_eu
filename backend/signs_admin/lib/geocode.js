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
      console.log(url, data)
      const result = data.result && data.result[0]
      return {
        postcode: result && result.postcode,
        parliamentaryConstituency: result && result.parliamentary_constituency
      }
    })
}
exports.geocode = geocode

function geocodeSign(sign) {
  const latitude = sign.useExif ? sign.exifLatitude : sign.deviceLatitude
  const longitude = sign.useExif ? sign.exifLongitude : sign.deviceLongitude
  return geocode(latitude, longitude).then(geocoding => {
    sign.postcode = geocoding.postcode
    sign.parliamentaryConstituency = geocoding.parliamentaryConstituency
    return sign
  })
}
exports.geocodeSign = geocodeSign
