const fs = require('fs')

const csvParse = require('csv-parse')
const mapshaper = require('mapshaper')

const geoJson = JSON.parse(
  fs.readFileSync('../postcode-area-boundaries.geo.json', 'utf-8')
)
const inputRegions = fs.readFileSync('../postcode-regions.csv')
const csvParseOptions = { columns: true }
const regionLookup = {}
csvParse(inputRegions, csvParseOptions, function (err, csv) {
  if (err) throw err
  for (let row of csv) {
    regionLookup[row.area] = row.region
  }

  for (let feature of geoJson.features) {
    feature.properties.region = regionLookup[feature.properties.name]
    if (!feature.properties.region) {
      console.warn(`skipped: ${feature.properties.name}`)
    }
  }

  geoJson.features = geoJson.features.filter(
    (feature) => feature.properties.region
  )

  fs.writeFileSync(
    '/tmp/postcode-region-boundaries.geo.json', JSON.stringify(geoJson))

  mapshaper.runCommands('-i /tmp/postcode-region-boundaries.geo.json -dissolve region -o /tmp/postcode-region-boundaries-dissolved.geo.json', function (err) {
    if (err) throw err
    console.log('done dissolve')

    mapshaper.runCommands('-i /tmp/postcode-region-boundaries-dissolved.geo.json -simplify 0.7 -o ../postcode-region-boundaries.geo.json', function (err) {
      if (err) throw err
      console.log('done simplify')
    })
  })
})
