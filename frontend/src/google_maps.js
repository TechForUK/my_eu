import loadGoogleMapsApi from 'load-google-maps-api'

let apiKey
if (process.env.NODE_ENV === 'production') {
  apiKey = process.env.PRODUCTION_MY_EU_API_KEY
} else {
  apiKey = process.env.DEVELOPMENT_MY_EU_API_KEY
}

let googleMapsApi
export function getGoogleMapsApi() {
  // Lazy load so we don't try to run this during static site generation.
  if (!googleMapsApi) {
    googleMapsApi = loadGoogleMapsApi({
      key: apiKey,
      libraries: ['places']
    })
  }
  return googleMapsApi
}

let registerGoogleMap
const googleMap = new Promise(function(resolve) {
  registerGoogleMap = resolve
})
export { registerGoogleMap }

export function getGoogleMapsApiAndMap() {
  return Promise.all([getGoogleMapsApi(), googleMap])
}
