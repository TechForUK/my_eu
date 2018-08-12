import loadGoogleMapsApi from 'load-google-maps-api'

let apiKey
if (process.env.NODE_ENV === 'production') {
  apiKey = process.env.PRODUCTION_MY_EU_API_KEY
} else {
  apiKey = process.env.DEVELOPMENT_MY_EU_API_KEY
}

export default loadGoogleMapsApi({
  key: apiKey,
  libraries: ['places']
})
