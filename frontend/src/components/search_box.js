/* global alert */

import React from 'react'

import { getGoogleMapsApiAndMap } from '../google_maps'

const autocompleteOptions = {
  types: ['geocode'],
  componentRestrictions: { country: ['UK'] }
}

// Only return fields we need, to avoid paying lots of money.
const fields = ['geometry', 'formatted_address', 'icon']

class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.marker = null
    this.formRef = React.createRef()
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    getGoogleMapsApiAndMap().then(([googleMaps, map]) =>
      this.setUpAutocomplete(googleMaps, map)
    )
  }

  render() {
    return (
      <form ref={this.formRef}>
        <div className="form-group">
          <label>
            The EU invests around{' '}
            <a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31">
              £5 billion
            </a>{' '}
            a year in the UK. Search by your address or postcode to see some of
            the investments near you:
            <div className="input-group">
              <input
                ref={this.inputRef}
                className="form-control"
                placeholder="e.g. SW1A 1AA"
              />
              <div className="input-group-append">
                <input
                  className="btn btn-outline-primary"
                  type="submit"
                  value="&#x1f50d;"
                />
              </div>
            </div>
          </label>
        </div>
      </form>
    )
  }

  setUpAutocomplete(googleMaps, map) {
    const autocomplete = new googleMaps.places.Autocomplete(
      this.inputRef.current,
      autocompleteOptions
    )
    autocomplete.setFields(fields)

    // Bias the results toward the current view.
    autocomplete.bindTo('bounds', map)

    // If the user presses enter or clicks the submit button, the place doesn't
    // get picked up from the fancy dropdown, so we need extra logic.
    //
    // 1. Happy path: user types in query, selects from dropdown. The
    // place_changed event fires. The geometry is present. The submit event does
    // not fire. All is well.
    //
    // 2. User types in query and presses enter. The place_changed event fires,
    // but there is no geometry. The form submit fires, and we look up the user's
    // query using the AutocompleteService and then find it with the
    // PlacesService.
    //
    // 3. User types in query and then clicks the submit button. The place_changed
    // event does not fire. The submit event does fire, and we proceed as in (2).
    //
    // Approach for (2-3) based on https://stackoverflow.com/a/28100636/2053820
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry) this.markPlace(googleMaps, map, place)
    })

    this.formRef.current.onsubmit = event => {
      this.findPlaceName(googleMaps, map, this.inputRef.current.value)
      return false
    }
  }

  markPlace(googleMaps, map, place) {
    // Clear out the old marker.
    if (this.marker) {
      this.marker.setMap(null)
      this.marker = null
    }

    // For each place, get the icon, name and location.
    var bounds = new googleMaps.LatLngBounds()

    var icon = {
      url: place.icon,
      size: new googleMaps.Size(71, 71),
      origin: new googleMaps.Point(0, 0),
      anchor: new googleMaps.Point(17, 34),
      scaledSize: new googleMaps.Size(25, 25)
    }

    // Create a marker for each place.
    this.marker = new googleMaps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location,
      clickable: false
    })

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport)
    } else {
      bounds.extend(place.geometry.location)
    }

    map.fitBounds(bounds)
    if (map.getZoom() > 12) {
      map.setZoom(12)
    }
  }

  findPlaceName(googleMaps, map, name) {
    const autocompleteService = new googleMaps.places.AutocompleteService()

    const placePredictionOptions = Object.assign({}, autocompleteOptions, {
      input: name,
      offset: name.length
    })

    const receivePlacePredictions = (list, _status) => {
      if (list && list.length > 0) {
        this.markFoundPlace(googleMaps, map, list[0].place_id)
      } else {
        this.showNotFoundError()
      }
    }

    autocompleteService.getPlacePredictions(
      placePredictionOptions,
      receivePlacePredictions
    )
  }

  markFoundPlace(googleMaps, map, placeId) {
    const placesService = new googleMaps.places.PlacesService(map)

    const receivePlaceDetails = (place, _status) => {
      if (place && place.geometry) {
        this.markPlace(googleMaps, map, place)
      } else {
        this.showNotFoundError()
      }
    }

    placesService.getDetails({ fields, placeId }, receivePlaceDetails)
  }

  showNotFoundError() {
    alert("Sorry, we couldn't find that place. Please try again.")
  }
}

export default SearchBox
