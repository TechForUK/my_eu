# toGeoJSON Tools

## KML to GeoJSON

```
<../NUTS_Level_2_January_2018_Ultra_Generalised_Clipped_Boundaries_in_the_United_Kingdom.kml node kml_to_geojson.js >../NUTS_Level_2_January_2018_Ultra_Generalised_Clipped_Boundaries_in_the_United_Kingdom.geo.json

<../postcode-area-boundaries.kml node kml_to_geojson.js >../postcode-area-boundaries.geo.json
```

## KML CSV to GeoJSON

Convert CSV of KML to a single GeoJSON file.

```
<../uk_postcode_districts_deduplicated.csv node kml_csv_to_geojson.js >../uk_postcode_districts_deduplicated.json
```

## UK Postcode Areas to UK 'Postcode Regions'

Dissolve the postcode area polygons according to the postcode region table.
