/* global fetch */

import FundingMarkerData from './marker_data/funding_marker_data'
import HospitalMarkerData from './marker_data/hospital_marker_data'

import packedPostcodesPath from '../../data/map/output/packed_postcodes.data.json'

const ICON_MASK_BITS = 1
const ICON_MASK = 0x1

export default class PackedPostcodes {
  constructor(googleMaps, markerManager, handleClick) {
    this.googleMaps = googleMaps
    this.markerManager = markerManager

    this.loadData = fetch(packedPostcodesPath, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => {
        this.postcodes = this._unpack(json, handleClick)
      })
  }

  _unpack(data, handleClick) {
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
        const packedAmount = codeData[i + 3]
        const position = new this.googleMaps.LatLng(
          minLatitude + deltaLatitude,
          minLongitude + deltaLongitude
        )
        const amount = packedAmount >> ICON_MASK_BITS
        const iconMask = packedAmount & ICON_MASK
        let markerData
        if (iconMask === 0) {
          markerData = new FundingMarkerData(
            amount,
            position,
            outwardCode,
            inwardCode
          )
        } else {
          markerData = new HospitalMarkerData(
            amount,
            position,
            outwardCode,
            inwardCode
          )
        }
        inwardCodes[inwardCode] = markerData
        this.markerManager.add(markerData, handleClick)
      }
    }
    return outwardCodes
  }

  zoomMapToPostcode(outwardCode, inwardCode) {
    const findPostcodeAndZoom = () => {
      const inwardCodes = this.postcodes[outwardCode]
      if (!inwardCodes) return
      const postcode = inwardCodes[inwardCode]
      if (!postcode) return

      const bounds = new this.googleMaps.LatLngBounds()
      bounds.extend(postcode.position)
      this.markerManager.zoomMapWithMinMarkers(bounds)
    }
    this.loadData.then(findPostcodeAndZoom)
  }
}
