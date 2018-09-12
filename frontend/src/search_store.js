import { getGoogleMapsApiAndMap } from './google_maps'
import { fetchWithTimeout } from './utilities'

export const AUTOCOMPLETE_OPTIONS = {
  types: ['geocode'],
  componentRestrictions: { country: ['UK'] }
}

export const FIELDS = ['geometry', 'formatted_address', 'icon']

export const PLACE_NOT_FOUND = 'place not found'

// From https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Validation
const POSTCODE_RX = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/

const POSTCODES_API_TIMEOUT = 2000 // ms

/**
 * Manage Google Maps Autocomplete / Places results.
 *
 * We'd like to keep the search URLs friendly, but the map needs to know
 * latitude and longitude.
 */
export class SearchStore {
  constructor(googleMaps, map) {
    this.googleMaps = googleMaps
    this.map = map
    this.cache = {}
  }

  storePlaceByName(name, place) {
    this.cache[name] = place
  }

  findPlaceByName(name) {
    return new Promise((resolve, reject) => {
      if (this.cache[name]) {
        resolve(this.cache[name])
      } else {
        this._findPlaceByPostcodeOrName(name)
          .then(place => {
            this.cache[name] = place
            return place
          })
          .then(resolve)
          .catch(reject)
      }
    })
  }

  _findPlaceByPostcodeOrName(name) {
    const strippedName = name.replace(/^\s+|\s+$/g, '')
    if (POSTCODE_RX.test(strippedName)) {
      return this._lookupPostcodeWithPostcodesIoApi(strippedName)
    } else {
      return this._findPlaceByName(name)
    }
  }

  _lookupPostcodeWithPostcodesIoApi(postcode) {
    const encodedPostcode = encodeURIComponent(postcode)
    const url = `https://api.postcodes.io/postcodes/${encodedPostcode}`
    return fetchWithTimeout(url, undefined, POSTCODES_API_TIMEOUT)
      .then(response => {
        if (response.status === 200) return response.json()
        if (response.status === 404) throw new Error(PLACE_NOT_FOUND)
        throw new Error('postcodes.io lookup failed')
      })
      .then(data => {
        return {
          geometry: {
            location: new this.googleMaps.LatLng(
              data.result.latitude,
              data.result.longitude
            )
          }
        }
      })
      .catch(err => {
        if (err.message === PLACE_NOT_FOUND) throw err
        // Fall back to Google API.
        return this._findPlaceByName(postcode)
      })
  }

  _findPlaceByName(name) {
    const autocompleteService = new this.googleMaps.places.AutocompleteService()

    const placePredictionOptions = Object.assign({}, AUTOCOMPLETE_OPTIONS, {
      input: name,
      offset: name.length
    })

    return new Promise((resolve, reject) => {
      const receivePlacePredictions = (list, _status) => {
        if (list && list.length > 0) {
          resolve(this._findPlaceById(list[0].place_id))
        } else {
          reject(new Error(PLACE_NOT_FOUND))
        }
      }

      autocompleteService.getPlacePredictions(
        placePredictionOptions,
        receivePlacePredictions
      )
    })
  }

  _findPlaceById(placeId) {
    const placesService = new this.googleMaps.places.PlacesService(this.map)

    let resolveResult
    let rejectResult
    const result = new Promise((resolve, reject) => {
      resolveResult = resolve
      rejectResult = reject
    })

    const receivePlaceDetails = (place, _status) => {
      if (place && place.geometry) {
        resolveResult(place)
      } else {
        rejectResult(new Error(PLACE_NOT_FOUND))
      }
    }

    placesService.getDetails({ fields: FIELDS, placeId }, receivePlaceDetails)

    return result
  }
}

let singleton

/**
 * Promise for the search store singleton.
 *
 * @return {Promise<SearchStore>}
 */
export default function getSearchStore() {
  if (!singleton) {
    singleton = getGoogleMapsApiAndMap().then(
      ([googleMaps, map]) => new SearchStore(googleMaps, map)
    )
  }
  return singleton
}
