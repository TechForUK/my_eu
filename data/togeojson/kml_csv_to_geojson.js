const fs = require('fs')

const csvParse = require('csv-parse')
const toGeoJSON = require('@mapbox/togeojson')
const DOMParser = require('xmldom').DOMParser

const input = fs.readFileSync('/dev/stdin', 'utf-8')
const csvParseOptions = {
  columns: true,
  max_limit_on_data_read: 1024 * 1024
}

csvParse(input, csvParseOptions, function (err, output) {
  if (err) throw err

  let result = null
  for (let row of output) {
    const wrappedAreaData =
      `<Placemark>
        <name>${row['Postcode district']}</name>
        ${row['Area data']}
      </Placemark>`
    const kml = new DOMParser().parseFromString(wrappedAreaData)
    const geoJSON = toGeoJSON.kml(kml)
    if (result) {
      result.features.push.apply(result.features, geoJSON.features)
    } else {
      result = geoJSON
    }
  }
  console.log(JSON.stringify(result))
})
