import SignMarkerData from './marker_data/sign_marker_data'
import SignsStore from '../signs/store'

export default class SignsMarkerManager {
  constructor(googleMaps, markerManager, handleClick) {
    this.googleMaps = googleMaps
    this.markerManager = markerManager
    this.signMarkers = null

    this.loadData = SignsStore.getInstance().loadData.then(signs => {
      this.signMarkers = signs.map(record => this._makeMarkerData(record))
      this.signMarkers.forEach(signMarker => {
        this.markerManager.add(signMarker, handleClick)
      })
    })
  }

  _makeMarkerData(record) {
    return new SignMarkerData(
      new this.googleMaps.LatLng(record.latitude, record.longitude),
      record.id
    )
  }

  zoomMapToSign(signId) {
    const findSignAndZoom = () => {
      const sign = this.signMarkers.find(sign => sign.id === signId)
      if (!sign) return
      const bounds = new this.googleMaps.LatLngBounds()
      bounds.extend(sign.position)
      this.markerManager.zoomMapWithMinMarkers(bounds)
    }
    this.loadData.then(findSignAndZoom)
  }
}
