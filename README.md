# My.EU

## Data Processing

### Requirements

We recommend using Python 3 with anaconda.

To avoid committing the output of IPython notebooks, which can be very large and make diffs hard to read, please install [nbstripout](https://github.com/kynan/nbstripout) as a git filter.

There is a `Makefile` in the `data` directory that handles running the IPython notebooks and updating the appropriate output files.

```
cd data
make
```

## App Development

The latest application is in the `frontend` directory. It is a static website built with webpack.

### Requirements

Install [node js](https://nodejs.org/en/) version 8.11 or higher.

The application uses Google Maps, so you will need to create a Google Cloud Platform account for development. This requires putting in a credit card, but development usage will generally be in the free tier.

1. [Go to the API list](https://console.cloud.google.com/google/maps-apis/api-list) and ensure that both the Google Maps JavaScript API and the Places API are enabled.

2. [Go to the Credentials list](https://console.cloud.google.com/apis/credentials) and generate an API key for development.

### Environment

For development, you need to put your development Google Maps API key in an environment variable:

```
DEVELOPMENT_MY_EU_API_KEY=YourKeyHere
```

(To deploy to production, you need a `PRODUCTION_MY_EU_API_KEY` variable set to a production API key; see notes on deployment below.)

### Running the Application

```
cd frontend
npm install
npm run dev
```

This will start the application using the `webpack-serve` development server on `http://localhost:8080`. Changes to the application's source files in `frontend/src` will in most cases automatically reload the page.

You can also preview the as it will be built in production (but with a development Google Maps API key, so the map will load) with

```
cd frontend
PRODUCTION_MY_EU_API_KEY=$DEVELOPMENT_MY_EU_API_KEY npm run build
npm run serve
rm -rf dist # don't leak your development key!
```

## Code Style

There is an [editorconfig](https://editorconfig.org/) in the root that defines encoding, tabs vs spaces, etc.. Please use it. The best way to do this is to get an editorconfig plugin for your editor.

The [prettier](https://github.com/prettier/prettier) code formatter is set up to format the JavaScript code consistently. Please use it. The best way to do it is to get a plugin for your editor, but you can also run

```
npm install # in the repo root
npm run prettier
```

to format all the code.

There is also [eslint](https://eslint.org/) for JavaScript linting. Again, the best thing to do is turn on the plugin for your editor, but you can also run

```
npm run eslint
```

to check all the code.

## Deployment

The static website is deployed to Google Cloud Storage behind CloudFlare for SSL. To deploy:

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
