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

  map.data.loadGeoJson(farmFundingDataPath, { idPropertyName: 'name' })
  map.data.loadGeoJson(beneficiariesPath)
  map.data.loadGeoJson(coordisPath)
}

export default class Map extends React.Component {
  componentDidMount() {
    loadGoogleMapsApi.then(setUpMap)
  }

  render() {
    return <div id="my-eu-map" />
  }
}
