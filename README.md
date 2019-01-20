# My.EU

## Data Processing

### Requirements

We recommend using Python 3 with anaconda. There are also non-conda dependencies to install with pip:

```
pip install -r requirements.txt
```

To avoid committing the output of IPython notebooks, which can be very large and make diffs hard to read, please install [nbstripout](https://github.com/kynan/nbstripout) as a git filter.

There is a `Makefile` in the `data` directory that handles running the IPython notebooks and updating the appropriate output files.

```
cd data
make
```

### Input Datasets

Most datasets are included in this repo, but some are quite large, so they must be downloaded separately, as follows.

You only need to download these if you want to work on the relevant processing; the data needed for development on the app are in the `data/*/output` folders, especially `data/map/output`.

#### CAP

From these sources:

- http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/e153b560-7538-442b-b3ab-a40bf4adf576 (2014)
- http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/06307dc0-4dcb-4305-a3e2-a8fdeb2a2a25 (2015)
- http://cap-payments.defra.gov.uk/Download.aspx (2016, 2017)

Files must be stored here:

- `data/cap/input/2014_All_CAP_Search_Results_Data_P14_1.xls`
- `data/cap/input/2015/DAERA-Table 1.csv`
- `data/cap/input/2015/RPA-Table 1.csv`
- `data/cap/input/2015/RPA2-Table 1.csv`
- `data/cap/input/2015/SGRPID-Table 1.csv`
- `data/cap/input/2015/WG-Table 1.csv`
- `data/cap/input/2016_All_CAP_Search_Results_Data_P14.xlsx`
- `data/cap/input/2017_All_CAP_Search_Results_Data_P14.xlsx`

#### CORDIS

From these sources:

- https://data.europa.eu/euodp/data/dataset/cordisfp7projects
- https://data.europa.eu/euodp/en/data/dataset/cordisH2020projects

Files must be stored here:

- `data/cordis/input/fp7/cordis-fp7briefs.xlsx`
- `data/cordis/input/fp7/cordis-fp7organizations.xlsx`
- `data/cordis/input/fp7/cordis-fp7projects.xlsx`
- `data/cordis/input/h2020/cordis-h2020organizations.xlsx`
- `data/cordis/input/h2020/cordis-h2020projects.xlsx`

#### Erasmus

From this page:

- http://ec.europa.eu/programmes/erasmus-plus/projects/eplus-projects-compendium/

Files must be stored here:

- `data/erasmus/input/CoopIndustrialisedCountries_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/ErasmusMundus_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/ErasmusPlus_JeanMonnet_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/ErasmusPlus_KA1_2014_LearningMobilityOfIndividuals_Projects_Overview_2018-09-11.xls`
- `data/erasmus/input/ErasmusPlus_KA1_2015_LearningMobilityOfIndividuals_Projects_Overview_2018-09-11.xls`
- `data/erasmus/input/ErasmusPlus_KA1_2016_LearningMobilityOfIndividuals_Projects_Overview_2018-09-11.xls`
- `data/erasmus/input/ErasmusPlus_KA1_2017_LearningMobilityOfIndividuals_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/ErasmusPlus_KA1_2018_LearningMobilityOfIndividuals_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/ErasmusPlus_KA2_CooperationForInnovationAndTheExchangeOfGoodPractices_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/ErasmusPlus_KA3_SupportForPolicyReform_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/ErasmusPlus_Sports_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/LifeLongLearning_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/Sports_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/Tempus_Projects_Overview_2018-09-10.xls`
- `data/erasmus/input/YouthInAction_Projects_Overview_2018-09-10.xls`

#### LIFE

From this page:

https://www.eea.europa.eu/data-and-maps/data/natura-9#tab-european-data

The `NATURA2000SITES` csv file must be stored here:

- `data/life/input/NATURA2000SITES.csv`

## App Development

The latest application is in the `frontend` directory. It is a static website built with webpack.

### Requirements

Install [node js](https://nodejs.org/en/) version 8.11 or higher.

The application uses Google Maps, so you will need to create a Google Cloud Platform account for development. This requires putting in a credit card, but development usage will generally be in the free tier.

1.  [Go to the API list](https://console.cloud.google.com/google/maps-apis/api-list) and ensure that both the Google Maps JavaScript API and the Places API are enabled.

2.  [Go to the Credentials list](https://console.cloud.google.com/apis/credentials) and generate an API key for development.

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

This will start the application using the `webpack-serve` development server on `http://localhost:8080/webpack-dev-server/`. Changes to the application's source files in `frontend/src` will in most cases automatically reload the page.

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

1.  You need to be granted write access to the Google Cloud Storage bucket that hosts the website.

2.  You need to get the `PRODUCTION_MY_EU_API_KEY`, which restricts the referrer to `www.myeu.uk` (and does not allow localhost or other domains).

3.  To deploy with error monitoring, you need to get the `ROLLBAR_ACCESS_TOKEN` (`post_client_item`) and `ROLLBAR_DEPLOY_ACCESS_TOKEN` (`post_server_item`) keys for our rollbar project.

Then run the deploy script to deploy:

```
cd frontend
./deploy.sh
```

## License

Please see `LICENSE.md`.
