/* global fetch */

import packedPostcodesPath from '../../data/map/output/packed_postcodes.data.json'
import MarkerClusterer from './marker_clusterer'
import euCircleGbpClusterPath from '../../images/eu_circle_gbp_cluster.svg'
import euCircleGbpPath from '../../images/eu_circle_gbp.svg'

import { formatSemiCompact } from '../../utilities'

const MARKER_SIZE = 26

function unpackPostcodeMarkers(googleMaps, map, data, handleClick) {
  const markers = []

  const minLongitude = data.min_longitude
  const minLatitude = data.min_latitude
  for (let outwardCode in data.postcodes) {
    if (!data.postcodes.hasOwnProperty(outwardCode)) continue
    const codeData = data.postcodes[outwardCode]
    for (let i = 0; i < codeData.length; i += 4) {
      const inwardCode = codeData[i]
      const deltaLongitude = codeData[i + 1]
      const deltaLatitude = codeData[i + 2]
      const amount = codeData[i + 3]
      const position = new googleMaps.LatLng(
        minLatitude + deltaLatitude,
        minLongitude + deltaLongitude
      )
      const postcode = `${outwardCode} ${inwardCode}`
      const myEu = { outwardCode, inwardCode, postcode, amount }
      const icon = {
        size: new googleMaps.Size(MARKER_SIZE, MARKER_SIZE),
        scaledSize: new googleMaps.Size(MARKER_SIZE, MARKER_SIZE),
        url: euCircleGbpPath
      }
      const marker = new googleMaps.Marker({ position, icon, myEu })
      googleMaps.event.addListener(marker, 'click', function(event) {
        handleClick(event, myEu)
      })
      markers.push(marker)
    }
  }

  return markers
}

function setUpClusterer(googleMaps, map, markers) {
  const styles = [30, 34, 38, 42, 46, 50].map(function(size) {
    return {
      url: euCircleGbpClusterPath,
      textSize: 12,
      textColor: '#fc0',
      width: size,
      height: size
    }
  })
  const markerClusterer = new MarkerClusterer(map, markers, { styles })
  markerClusterer.setCalculator(function calculator(markers, numStyles) {
    let total = 0
    for (let marker of markers) total += marker.myEu.amount
    const text = formatSemiCompact(total)
    const index = Math.round(Math.log10(total) - 3)
    return { text, index }
  })
  return markerClusterer
}

export default function addPackedPostcodeData(googleMaps, map, handleClick) {
  return fetch(packedPostcodesPath, {
    credentials: 'same-origin'
  })
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      const markers = unpackPostcodeMarkers(googleMaps, map, json, handleClick)
      setUpClusterer(googleMaps, map, markers)
    })
}
