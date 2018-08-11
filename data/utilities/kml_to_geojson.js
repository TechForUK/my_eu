const fs = require('fs')

const toGeoJSON = require('@mapbox/togeojson')
const DOMParser = require('xmldom').DOMParser

const input = fs.readFileSync('/dev/stdin', 'utf-8')
const kml = new DOMParser().parseFromString(input)
const geoJSON = toGeoJSON.kml(kml)
console.log(JSON.stringify(geoJSON))
