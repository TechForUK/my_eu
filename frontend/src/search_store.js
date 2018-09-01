import { getGoogleMapsApiAndMap } from './google_maps'

export const AUTOCOMPLETE_OPTIONS = {
  types: ['geocode'],
  componentRestrictions: { country: ['UK'] }
}

export const FIELDS = ['geometry', 'formatted_address', 'icon']

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
        this._findPlaceByName(name)
          .then(place => {
            this.cache[name] = place
            return place
          })
          .then(resolve)
          .catch(reject)
      }
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
          reject(this.makeNotFoundError())
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
        rejectResult(this.makeNotFoundError())
      }
    }

    placesService.getDetails({ fields: FIELDS, placeId }, receivePlaceDetails)

    return result
  }

  makeNotFoundError() {
    return new Error('place not found')
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
