import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import React from 'react'
import loadGoogleMapsApi from './load_google_maps_api'

import eusmallPath from './images/eusmall.png'
import farmFundingDataPath from './data/farm_funding_data_by_area.geo.json'
import beneficiariesPath from './data/beneficiaries.geo.json'
import coordisPath from './data/coordis_data.geo.json'

// TODO change styles when zoomed in?
// https://stackoverflow.com/questions/3121400/google-maps-v3-how-to-change-the-map-style-based-on-zoom-level

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

function addCapData(googleMaps, map) {
  function getFeatureValue(feature) {
    return feature.getProperty('total') / feature.getProperty('count')
  }

  const layer = new googleMaps.Data({ map })
  layer.loadGeoJson(
    farmFundingDataPath,
    { idPropertyName: 'name' },
    setUpCapDataLayer
  )

  function setUpCapDataLayer(features) {
    const maxFeatureValue = Math.max(...features.map(getFeatureValue))
    const scale = d3Scale
      .scaleSequential(d3ScaleChromatic.interpolateBlues)
      .domain([0, maxFeatureValue])

    layer.setStyle(function(feature) {
      const opacity = 0.75
      const color = scale(getFeatureValue(feature))
      return {
        fillColor: color,
        fillOpacity: opacity,
        strokeWeight: 1,
        strokeColor: color,
        strokeOpacity: opacity / 2
      }
    })

    layer.addListener('mouseover', function(event) {
      event.feature.forEachProperty(function(value, property) {
        console.log(property, ':', value)
      })
    })
  }
}

function addPointData(googleMaps, map, path) {
  const layer = new googleMaps.Data({ map })
  layer.loadGeoJson(path)
  layer.setStyle(function(feature) {
    return { icon: eusmallPath }
  })
}

function setUpMap(googleMaps) {
  const map = new googleMaps.Map(document.getElementById('my-eu-map'), {
    center: {
      lat: 54.5,
      lng: -1.5
    },
    zoom: 6,
    styles: mapStyles
  })

  setUpSearchBox(googleMaps, map)
  addCapData(googleMaps, map)
  addPointData(googleMaps, map, beneficiariesPath)
  addPointData(googleMaps, map, coordisPath)
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
