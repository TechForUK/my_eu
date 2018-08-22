/* global alert */

import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import addCapData from './cap_data'
import InfoWrapper from './info_wrapper'
import mapStyles from './map_styles'
import addPackedPostcodeLayer from './packed_postcodes'
import setUpSearchBox from './search_box'

import loadGoogleMapsApi from '../../load_google_maps_api'
import twttr from '../../social/twitter'

import eusmallPath from '../../images/eusmall.png'

// TODO change styles when zoomed in?
// https://stackoverflow.com/questions/3121400/google-maps-v3-how-to-change-the-map-style-based-on-zoom-level

function updateInfoWindowContent(map, infoWindow, component) {
  // Clean up previous window, if any.
  const container = infoWindow.getContent()
  ReactDOM.unmountComponentAtNode(container)
  infoWindow.close()

  // Set maximum width for mobile-friendliness.
  // Process is based on https://developers.google.com/maps/documentation/javascript/reference/3/info-window#InfoWindowOptions.maxWidth
  const INFO_WINDOW_PADDING = 60 // determined empirically
  ReactDOM.render(component, container)
  infoWindow.setOptions({
    maxWidth: $(map.getDiv()).width() - INFO_WINDOW_PADDING
  })
  infoWindow.setContent(container)
  infoWindow.open(map)
  twttr.widgets.load(container)
}

function makeAsyncPointInfoWindow(feature) {
  return (
    <InfoWrapper
      outwardCode={feature.getProperty('outwardCode')}
      inwardCode={feature.getProperty('inwardCode')}
      postcode={feature.getId()}
    />
  )
}

function setUpMap(googleMaps) {
  const map = new googleMaps.Map(document.getElementById('my-eu-map'), {
    center: {
      lat: 54.595,
      lng: -2.888
    },
    zoom: 6,
    styles: mapStyles,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  })

  const infoWindow = new googleMaps.InfoWindow({
    content: document.createElement('div')
  })

  setUpSearchBox(googleMaps, map)
  addCapData(googleMaps, map, infoWindow, updateInfoWindowContent)

  addPackedPostcodeLayer(googleMaps, map)
    .then(function(layer) {
      layer.setStyle(function(feature) {
        return { icon: eusmallPath }
      })

      layer.addListener('click', function(event) {
        const feature = event.feature
        infoWindow.setPosition(feature.getGeometry().get())
        updateInfoWindowContent(
          map,
          infoWindow,
          makeAsyncPointInfoWindow(feature)
        )

        ReactGA.event({
          category: 'Map',
          action: 'Search'
        })
      })
    })
    .catch(function() {
      alert('Sorry, we could not load the map data. Please try again.')
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

const container = document.getElementById('my-eu-map')
if (container) ReactDOM.render(<Map />, container)
