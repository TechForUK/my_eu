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

import CreativeInfo from '../info_windows/creative_info'
import FtsInfo from '../info_windows/fts_info'
import GenericInfo from '../info_windows/generic_info'

import loadGoogleMapsApi from '../../load_google_maps_api'
import twttr from '../../social/twitter'

import eusmallPath from '../../images/eusmall.png'

import creativePath from '../../data/creative_data.geo.json'
import fts2016Path from '../../data/fts2016_data.geo.json'
import fts2017Path from '../../data/fts2017_data.geo.json'

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

function makePointInfoWindow(feature) {
  if (
    feature.getProperty(
      "EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project's lifetime will not be reflected here.)"
    )
  ) {
    // creative europe data
    return <CreativeInfo feature={feature} />
  } else if (feature.getProperty('budget_line_name_and_number')) {
    // creative europe data
    return <FtsInfo feature={feature} />
  }
  return <GenericInfo feature={feature} />
}

function addPointData(googleMaps, map, path, infoWindow) {
  const layer = new googleMaps.Data({ map })
  layer.loadGeoJson(path)
  layer.setStyle(function(feature) {
    return { icon: eusmallPath }
  })
  layer.addListener('click', function(event) {
    const feature = event.feature
    infoWindow.setPosition(feature.getGeometry().get())
    updateInfoWindowContent(map, infoWindow, makePointInfoWindow(feature))
  })
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
  addPointData(googleMaps, map, creativePath, infoWindow)
  addPointData(googleMaps, map, fts2016Path, infoWindow)
  addPointData(googleMaps, map, fts2017Path, infoWindow)

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
          action: 'Clicked Popup'
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
