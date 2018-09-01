/* global fetch */

import packedPostcodesPath from '../../data/map/output/packed_postcodes.data.json'
import MarkerClusterer from './marker_clusterer'
import euCircleGbpPath from '../../images/eu_circle_gbp.svg'

const MIN_MARKERS = 5
const MARKER_SIZE = 26

class PostcodeData {
  constructor(amount, position) {
    this.amount = amount
    this.position = position
  }
}

function unpack(googleMaps, data) {
  const outwardCodes = {}
  const minLongitude = data.min_longitude
  const minLatitude = data.min_latitude
  for (let outwardCode in data.postcodes) {
    if (!data.postcodes.hasOwnProperty(outwardCode)) continue
    const codeData = data.postcodes[outwardCode]
    const inwardCodes = (outwardCodes[outwardCode] = {})
    for (let i = 0; i < codeData.length; i += 4) {
      const inwardCode = codeData[i]
      const deltaLongitude = codeData[i + 1]
      const deltaLatitude = codeData[i + 2]
      const amount = codeData[i + 3]
      const position = new googleMaps.LatLng(
        minLatitude + deltaLatitude,
        minLongitude + deltaLongitude
      )
      inwardCodes[inwardCode] = new PostcodeData(amount, position)
    }
  }
  return outwardCodes
}

function unpackPostcodeMarkers(googleMaps, map, postcodes, handleClick) {
  const markers = []

  for (let outwardCode in postcodes) {
    if (!postcodes.hasOwnProperty(outwardCode)) continue
    const inwardCodes = postcodes[outwardCode]
    for (let inwardCode in inwardCodes) {
      const { amount, position } = inwardCodes[inwardCode]
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
      url: euCircleGbpPath,
      textSize: 12,
      textColor: '#fc0',
      width: size,
      height: size
    }
  })
  const markerClusterer = new MarkerClusterer(map, markers, {
    minimumClusterSize: MIN_MARKERS,
    maxZoom: 14, // can't be much lower and still see London
    styles
  })
  markerClusterer.setCalculator(function calculator(markers, numStyles) {
    let total = 0
    for (let marker of markers) total += marker.myEu.amount
    const text = ''
    const index = Math.round(Math.log10(total) - 3)
    return { text, index }
  })
  return markerClusterer
}

export default class PackedPostcodes {
  constructor(googleMaps, map, handleClick) {
    this.googleMaps = googleMaps
    this.map = map

    this._loadData = fetch(packedPostcodesPath, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => {
        this.postcodes = unpack(googleMaps, json)
        this.markers = unpackPostcodeMarkers(
          googleMaps,
          map,
          this.postcodes,
          handleClick
        )
        setUpClusterer(googleMaps, map, this.markers)
      })
  }

  zoomMapToPostcode(outwardCode, inwardCode) {
    const findPostcodeAndZoom = () => {
      const inwardCodes = this.postcodes[outwardCode]
      if (!inwardCodes) return
      const postcode = inwardCodes[inwardCode]
      if (!postcode) return

      const bounds = new this.googleMaps.LatLngBounds()
      bounds.extend(postcode.position)
      this.zoomMapWithMinMarkers(bounds)
    }
    this._loadData.then(findPostcodeAndZoom)
  }

  zoomMapWithMinMarkers(bounds, minMarkers = MIN_MARKERS) {
    this.map.fitBounds(bounds)
    const zoomOutIfNeeded = () => {
      for (;;) {
        if (this._countVisibleMarkers() >= minMarkers) break
        if (this.map.getZoom() <= 1) break
        this.map.setZoom(this.map.getZoom() - 1)
      }
    }
    this._loadData.then(zoomOutIfNeeded)
  }

  _countVisibleMarkers() {
    const mapBounds = this.map.getBounds()
    if (!mapBounds) return 0
    let count = 0
    for (let marker of this.markers) {
      if (mapBounds.contains(marker.getPosition())) ++count
    }
    return count
  }
}
