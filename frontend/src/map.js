import React from 'react'
import loadGoogleMapsApi from './load_google_maps_api'

import eusmallPath from './images/eusmall.png'
import farmFundingDataPath from './data/farm_funding_data.geo.json'
import beneficiariesPath from './data/beneficiaries.geo.json'
import coordisPath from './data/coordis_data.geo.json'

const WHITE = '#fcfcfc'
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: WHITE }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { hue: '#5f94ff' }, { lightness: 60 }]
  }
]

function setUpMap(googleMaps) {
  const map = new googleMaps.Map(document.getElementById('my-eu-map'), {
    center: {
      lat: 54.5,
      lng: -1.5
    },
    zoom: 6,
    styles: mapStyles
  })

  function getTotalColor(total) {
    if (total >= 1e7) return '#08519c'
    if (total >= 1e6) return '#3182bd'
    if (total >= 1e6) return '#6baed6'
    if (total >= 1e4) return '#9ecae1'
    if (total >= 1e3) return '#c6dbef'
    if (total >= 1e2) return '#eff3ff'
    return WHITE
  }

  function getCountColor(total) {
    if (total >= 512) return '#08519c'
    if (total >= 256) return '#3182bd'
    if (total >= 128) return '#6baed6'
    if (total >= 64) return '#9ecae1'
    if (total >= 32) return '#c6dbef'
    if (total >= 16) return '#eff3ff'
    return WHITE
  }

  function getPerCapitaColor(total) {
    if (total >= 80000) return '#08519c'
    if (total >= 40000) return '#3182bd'
    if (total >= 20000) return '#6baed6'
    if (total >= 1000) return '#9ecae1'
    if (total >= 5000) return '#c6dbef'
    if (total >= 2500) return '#eff3ff'
    return WHITE
  }

  map.data.setStyle(function(feature) {
    // Handle point datasets with icons.
    if (feature.getProperty('beneficiary') || feature.getProperty('acronym')) {
      return { icon: eusmallPath }
    }
    // let color = getTotalColor(feature.getProperty('total'))
    // let color = getCountColor(feature.getProperty('count'))
    const color = getPerCapitaColor(
      feature.getProperty('total') / feature.getProperty('count')
    )
    const opacity = 0.75
    return {
      fillColor: color,
      fillOpacity: opacity,
      strokeWeight: 1,
      strokeColor: color,
      strokeOpacity: opacity / 2
    }
  })

  setUpSearchBox(googleMaps, map)

  map.data.loadGeoJson(farmFundingDataPath, { idPropertyName: 'name' })
  map.data.loadGeoJson(beneficiariesPath)
  map.data.loadGeoJson(coordisPath)
}

function setUpSearchBox(googleMaps, map) {
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
    marker = new google.maps.Marker({
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

export default class Map extends React.Component {
  componentDidMount() {
    loadGoogleMapsApi.then(setUpMap)
  }

  render() {
    return <div id="my-eu-map" />
  }
}
