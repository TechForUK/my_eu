/* global alert */

export default function setUpSearchBox(googleMaps, map) {
  const input = document.getElementById('my-eu-search-box')
  const autocompleteOptions = {
    types: ['geocode'],
    componentRestrictions: { country: ['UK'] }
  }
  const autocomplete = new googleMaps.places.Autocomplete(
    input,
    autocompleteOptions
  )

  // Only return fields we need, to avoid paying lots of money.
  const autocompleteFields = ['geometry', 'formatted_address', 'icon']
  autocomplete.setFields(autocompleteFields)

  // Bias the results toward the current view.
  autocomplete.bindTo('bounds', map)

  // Don't submit the form if the user presses enter.
  googleMaps.event.addDomListener(input, 'keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  })

  let marker = null
  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace()
    if (place.geometry) {
      markPlace(place)
    } else {
      lookUpPlacePrediction(place)
    }
  })

  function markPlace(place) {
    // Clear out the old marker.
    if (marker) {
      marker.setMap(null)
      marker = null
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
    marker = new googleMaps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
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

  // User pressed enter, which doesn't complete the address. Use the
  // autocomplete service to try to find what they wanted.
  // Based on https://stackoverflow.com/a/28100636/2053820
  function lookUpPlacePrediction(place) {
    const autocompleteService = new googleMaps.places.AutocompleteService()
    const placePredictionOptions = Object.assign({}, autocompleteOptions, {
      input: place.name,
      offset: place.name.length
    })
    autocompleteService.getPlacePredictions(
      placePredictionOptions,
      function receivePlacePredictions(list, _status) {
        if (list && list.length > 0) {
          markPlacePrediction(list[0])
        } else {
          showNotFoundError()
        }
      }
    )
  }

  function markPlacePrediction(prediction) {
    const placesService = new googleMaps.places.PlacesService(map)
    placesService.getDetails(
      { fields: autocompleteFields, placeId: prediction.place_id },
      function receivePlaceDetails(place, _status) {
        if (place && place.geometry) {
          markPlace(place)
        } else {
          showNotFoundError()
        }
      }
    )
  }

  function showNotFoundError() {
    alert("Sorry, we couldn't find that place. Please try again.")
  }
}
