import MarkerClusterer from './marker_clusterer'

import euCircleGbpPath from '../../images/eu_circle_gbp.svg'
import fundingPostcodePath from '../../images/funding_postcode.svg'
import fundingPostcodeSelectedPath from '../../images/funding_postcode_selected.svg'
import hospitalPostcodePath from '../../images/hospital_postcode.svg'
import hospitalPostcodeSelectedPath from '../../images/hospital_postcode_selected.svg'
import signMarkerPath from '../../images/sign_marker.svg'
import signMarkerSelectedPath from '../../images/sign_marker_selected.svg'

const ICON_URLS = [
  fundingPostcodePath,
  fundingPostcodeSelectedPath,
  hospitalPostcodePath,
  hospitalPostcodeSelectedPath,
  signMarkerPath,
  signMarkerSelectedPath
]

const MIN_MARKERS = 5
const MAX_ZOOM = 15

const MARKER_WIDTH = 29
const MARKER_HEIGHT = 40

export default class MarkerManager {
  constructor(googleMaps, map) {
    this.googleMaps = googleMaps
    this.map = map

    this.mapIcons = this._makeMapIcons()
    this.markers = []
    this.selectedMarker = null
  }

  _makeMapIcons() {
    const mapIcons = {}
    for (let iconUrl of ICON_URLS) {
      mapIcons[iconUrl] = this._makeMapIcon(iconUrl)
    }
    return mapIcons
  }

  _makeMapIcon(url) {
    return {
      size: new this.googleMaps.Size(MARKER_WIDTH, MARKER_HEIGHT),
      anchor: new this.googleMaps.Point(MARKER_WIDTH / 2, MARKER_HEIGHT),
      scaledSize: new this.googleMaps.Size(MARKER_WIDTH, MARKER_HEIGHT),
      url
    }
  }

  add(markerData, handleClick) {
    const marker = new this.googleMaps.Marker({
      position: markerData.position,
      icon: this.mapIcons[markerData.getIconUrl()]
    })
    marker.myEu = markerData
    this.googleMaps.event.addListener(marker, 'click', event => {
      handleClick(event, markerData)
      this.selectMarker(marker)
    })
    this.markers.push(marker)
  }

  selectMarker(marker) {
    if (this.selectedMarker) {
      this.selectedMarker.setIcon(
        this.mapIcons[this.selectedMarker.myEu.getIconUrl()]
      )
    }
    if (marker) {
      marker.setIcon(this.mapIcons[marker.myEu.getIconSelectedUrl()])
    }
    this.selectedMarker = marker
  }

  setUpClusterer() {
    const styles = [30, 34, 38, 42, 46, 50].map(function(size) {
      return {
        url: euCircleGbpPath,
        textSize: 12,
        textColor: '#fc0',
        width: size,
        height: size
      }
    })
    const markerClusterer = new MarkerClusterer(this.map, this.markers, {
      minimumClusterSize: MIN_MARKERS,
      maxZoom: MAX_ZOOM,
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

  zoomMapWithMinMarkers(bounds, minMarkers = MIN_MARKERS) {
    this.map.fitBounds(bounds)
    for (;;) {
      if (this._countVisibleMarkers() >= minMarkers) break
      if (this.map.getZoom() <= 1) break
      this.map.setZoom(this.map.getZoom() - 1)
    }
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
