import React from 'react'
import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import capPath from '../../data/cap_by_area.geo.json'
import CapInfo from '../info_windows/cap_info'

function getGeometryLatLngBounds(googleMaps, geometry) {
  const bounds = new googleMaps.LatLngBounds()
  geometry.forEachLatLng(latLng => bounds.extend(latLng))
  return bounds
}

export default function addCapData(
  googleMaps,
  map,
  infoWindow,
  updateInfoWindowContent
) {
  function getFeatureValue(feature) {
    return Math.pow(feature.getProperty('total'), 0.33)
  }

  const layer = new googleMaps.Data({ map })
  layer.loadGeoJson(capPath, { idPropertyName: 'name' }, setUpCapDataLayer)

  function setUpCapDataLayer(features) {
    const maxFeatureValue = Math.max(...features.map(getFeatureValue))
    const scale = d3Scale
      .scaleSequential(d3ScaleChromatic.interpolatePuBu)
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

    layer.addListener('click', function(event) {
      event.feature.forEachProperty(function(value, property) {
        const feature = event.feature
        const bounds = getGeometryLatLngBounds(
          googleMaps,
          feature.getGeometry()
        )

        infoWindow.setPosition(bounds.getCenter())
        updateInfoWindowContent(map, infoWindow, <CapInfo feature={feature} />)
        map.fitBounds(bounds)
      })
    })
  }
}
