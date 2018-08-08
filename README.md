# My.EU

## Development

The latest application is in the `frontend` directory. It is a static website built with webpack.

### Requirements

Install [node js](https://nodejs.org/en/) version 8.11 or higher.

The application uses Google Maps, so you will need to create a Google Cloud Platform account for development. This requires putting in a credit card, but development usage will generally be in the free tier.

1. [Go to the API list](https://console.cloud.google.com/google/maps-apis/api-list) and ensure that both the Google Maps JavaScript API and the Places API are enabled.

2. [Go to the Credentials list](https://console.cloud.google.com/apis/credentials) and generate a key for development.

### Environment

For development, you need to have the
```
DEVELOPMENT_MY_EU_API_KEY=...
```
environment variable set to your development Google Maps API key.

To deploy to production, you need a `PRODUCTION_MY_EU_API_KEY` variable set similarly; see notes on deployment below.

### Running the Application

```
cd frontend
npm install
npm run dev
```

This will start the application using the `webpack-serve` development server on `http://localhost:8080`. Changes to the application's source files will in most cases automatically reload the page.

## TODO

- about page needs updating with licenses
- anywhere to source images for the popups?
- prettier pop-ups
  - different pop-ups for different data sources?
- idea: zoom in when a region is clicked
- idea: see what it looks like with marker clustering
  - also https://github.com/googlemaps/js-rich-marker ?
- social media buttons
- add creative europe data

## Deployment

To deploy:

1. You need to be granted write access to the Google Cloud Storage bucket that hosts the website.

2. You need to get the `PRODUCTION_MY_EU_API_KEY`, which restricts the referrer to `www.myeu.uk` (and does not allow localhost or other domains).

The commands are then:

```
npm run build
gsutil rsync -c -R dist gs://www.myeu.uk
```

## Other Sources

Some high level data about EU funding in Wales:
http://www.arts.wales/137922.file.dld

Report from 2016:
http://speri.dept.shef.ac.uk/wp-content/uploads/2016/05/Brief24-UK-regions-and-European-structural-and-investment-funds.pdf

Post codes to NUTS3:
http://ec.europa.eu/eurostat/web/nuts/correspondence-tables/postcodes-and-nuts

https://gis.stackexchange.com/questions/249963/what-is-this-gis-principle-called/250000#250000
http://geoconvert.mimas.ac.uk/help/faq.html#postcode-comp
http://duspviz.mit.edu/tutorials/intro-postgis/

Post code area boundaries:
https://www.freemaptools.com/download-uk-postcode-outcode-boundaries.htm
(alternative: https://geolytix.co.uk/?postal_geom)
