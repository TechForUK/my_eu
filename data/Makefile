postcode-area-boundaries-simplified.geo.json : postcode-area-boundaries.geo.json
	cd togeojson &&\
	node_modules/.bin/mapshaper -i ../$< -simplify 0.45 -o ../$@
