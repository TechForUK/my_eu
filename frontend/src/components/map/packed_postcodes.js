/* global alert fetch */

import packedPostcodesPath from '../../data/map/output/packed_postcodes.data.json'

function addPackedPostcodeLayer(googleMaps, map, data) {
  const layer = new googleMaps.Data({ map })

  const minLongitude = data.min_longitude
  const minLatitude = data.min_latitude
  for (let outwardCode in data.postcodes) {
    if (!data.postcodes.hasOwnProperty(outwardCode)) continue
    const codeData = data.postcodes[outwardCode]
    for (let i = 0; i < codeData.length; i += 3) {
      const inwardCode = codeData[i]
      const deltaLongitude = codeData[i + 1]
      const deltaLatitude = codeData[i + 2]
      const geometry = new googleMaps.LatLng(
        minLatitude + deltaLatitude,
        minLongitude + deltaLongitude
      )
      const id = `${outwardCode} ${inwardCode}`
      const properties = { outwardCode, inwardCode }
      layer.add({ geometry, id, properties })
    }
  }

  return layer
}

export default function addPackedPostcodeData(googleMaps, map) {
  return fetch(packedPostcodesPath, {
    credentials: 'same-origin'
  })
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      return addPackedPostcodeLayer(googleMaps, map, json)
    })
    .catch(function() {
      alert('Sorry, we could not load the map data. Please try again.')
    })
}
