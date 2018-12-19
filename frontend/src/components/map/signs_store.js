/* global fetch */

import SignMarkerData from './marker_data/sign_marker_data'
import { convertSplitRowsToRecords, isBeta } from '../../utilities'

export default class SignsStore {
  constructor(googleMaps, markerManager, handleClick) {
    this.googleMaps = googleMaps
    this.markerManager = markerManager
    this.signs = null

    this.loadData = this._loadData().then(({ columns, data }) => {
      this.signs = convertSplitRowsToRecords(columns, data).map(record =>
        this._makeMarkerData(record)
      )
      this.signs.forEach(sign => {
        this.markerManager.add(sign, handleClick)
      })
    })
  }

  _loadData() {
    const columns = ['id', 'latitude', 'longitude']
    if (!isBeta())
      return new Promise((resolve, reject) => {
        resolve({ columns, data: [] })
      })

    if (process.env.NODE_ENV === 'production') {
      return this._loadProductionData()
    } else {
      return new Promise((resolve, reject) => {
        resolve(
          JSON.parse(
            '{"columns":["id","latitude","longitude"],"data":[["a30bfc84-a0e8-466e-abd9-f49629cd7256",51.490863,-0.135892],["f20b9379-19ce-4a43-9e0b-6bc1367df1bc",51.480342,-0.156713]]}'
          )
        )
      })
    }
  }

  _loadProductionData() {
    return fetch('https://www.myeu.uk/signs.json', {
      credentials: 'same-origin'
    }).then(response => response.json())
  }

  _makeMarkerData(record) {
    return new SignMarkerData(
      new this.googleMaps.LatLng(record.latitude, record.longitude),
      record.id
    )
  }

  zoomMapToSign(signId) {
    const findSignAndZoom = () => {
      const sign = this.signs.find(sign => sign.id === signId)
      if (!sign) return
      const bounds = new this.googleMaps.LatLngBounds()
      bounds.extend(sign.position)
      this.markerManager.zoomMapWithMinMarkers(bounds)
    }
    this.loadData.then(findSignAndZoom)
  }
}
