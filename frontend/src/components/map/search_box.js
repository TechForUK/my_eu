/* global alert */

export default function setUpSearchBox(googleMaps, map) {
  const input = document.getElementById('my-eu-search-box')
  const autocomplete = new googleMaps.places.Autocomplete(input, {
    types: ['geocode'],
    componentRestrictions: { country: ['UK'] }
  })

  // Only return fields we need, to avoid paying lots of money.
  autocomplete.setFields(['geometry', 'formatted_address', 'icon'])

  // Bias the results toward the current view.
  autocomplete.bindTo('bounds', map)

  // TODO better hacks: https://stackoverflow.com/a/28100636/2053820
  // but might still want the below to prevent a form submit... but then again
  // maybe just block the form submit more directly.

  // Don't submit the form if the user presses enter.
  googleMaps.event.addDomListener(input, 'keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  })

  let marker = null
  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace()
    if (!place.geometry) {
      alert("Sorry, we couldn't find that place. Please try again.")
      return
    }

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
  })
}
