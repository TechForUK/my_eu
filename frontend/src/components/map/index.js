/* global alert */

import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import addCapData from './cap_data'
import InfoWrapper from './info_wrapper'
import LoadingInfo from './loading_info'
import mapStyles from './map_styles'
import addPackedPostcodeLayer from './packed_postcodes'
import ProjectStore from './project_store'

import { getGoogleMapsApi, registerGoogleMap } from '../../google_maps'
import twttr from '../../social/twitter'

// TODO change styles when zoomed in?
// https://stackoverflow.com/questions/3121400/google-maps-v3-how-to-change-the-map-style-based-on-zoom-level

const projectStore = new ProjectStore()

const mapContainer = document.getElementById('my-eu-map')

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

function showProjectInfoWindow(map, infoWindow, myEuData) {
  const { outwardCode, inwardCode, postcode } = myEuData
  let projects = projectStore.lookup(outwardCode, inwardCode)
  if (projects) {
    updateInfoWindowContent(
      map,
      infoWindow,
      <InfoWrapper postcode={postcode} projects={projects} />
    )
  } else {
    updateInfoWindowContent(
      map,
      infoWindow,
      <LoadingInfo postcode={postcode} />
    )
    projectStore.load(outwardCode).then(function() {
      projects = projectStore.lookup(outwardCode, inwardCode)
      updateInfoWindowContent(
        map,
        infoWindow,
        <InfoWrapper postcode={postcode} projects={projects} />
      )
    })
  }
}

function setUpMap(googleMaps) {
  const map = new googleMaps.Map(mapContainer, {
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
  registerGoogleMap(map)

  const infoWindow = new googleMaps.InfoWindow({
    content: document.createElement('div')
  })

  addCapData(googleMaps, map, infoWindow, updateInfoWindowContent)

  function handlePostcodeClick(event, myEuData) {
    infoWindow.setPosition(event.latLng)
    showProjectInfoWindow(map, infoWindow, myEuData)
    ReactGA.event({
      category: 'Map',
      action: 'Click Postcode'
    })
  }

  addPackedPostcodeLayer(googleMaps, map, handlePostcodeClick).catch(
    function() {
      alert('Sorry, we could not load the map data. Please try again.')
    }
  )
}

if (mapContainer) getGoogleMapsApi().then(setUpMap)
