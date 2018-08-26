/* global alert */

export default function setUpSearchBox(googleMaps, map) {
  const form = document.getElementById('my-eu-search-form')
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
  const fields = ['geometry', 'formatted_address', 'icon']
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
  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace()
    if (place.geometry) markPlace(place)
  })

  form.onsubmit = function handleSearchFormSubmit(event) {
    findPlaceName(input.value)
    return false
  }

  let marker = null
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

  function findPlaceName(name) {
    const autocompleteService = new googleMaps.places.AutocompleteService()
    const placePredictionOptions = Object.assign({}, autocompleteOptions, {
      input: name,
      offset: name.length
    })
    autocompleteService.getPlacePredictions(
      placePredictionOptions,
      function receivePlacePredictions(list, _status) {
        if (list && list.length > 0) {
          markFoundPlace(list[0].place_id)
        } else {
          showNotFoundError()
        }
      }
    )
  }

  function markFoundPlace(placeId) {
    const placesService = new googleMaps.places.PlacesService(map)
    placesService.getDetails({ fields, placeId }, function receivePlaceDetails(
      place,
      _status
    ) {
      if (place && place.geometry) {
        markPlace(place)
      } else {
        showNotFoundError()
      }
    })
  }

  function showNotFoundError() {
    alert("Sorry, we couldn't find that place. Please try again.")
  }
}
