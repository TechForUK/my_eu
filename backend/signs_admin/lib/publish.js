const {
  MAIN_BUCKET_NAME,
  MAIN_BUCKET_SIGNS_PATH,
  SIGN_KIND
} = require('./common')
const datastore = require('./datastore')
const storage = require('./storage')

const SIGNS_DATA_KEY = `${MAIN_BUCKET_SIGNS_PATH}.json`

function publishSignsData() {
  return datastore
    .runQuery(datastore.createQuery(SIGN_KIND).filter('approved', '=', true))
    .then(results => {
      const signs = results[0]
      const signsData = {
        columns: [
          'id',
          'latitude',
          'longitude',
          'title',
          'postcode',
          'parliamentaryConstituency'
        ],
        data: signs.map(sign => [
          sign[datastore.KEY].name,
          sign.useExif ? sign.exifLatitude : sign.deviceLatitude,
          sign.useExif ? sign.exifLongitude : sign.deviceLongitude,
          sign.title,
          sign.postcode,
          sign.parliamentaryConstituency
        ])
      }
      return storage
        .bucket(MAIN_BUCKET_NAME)
        .file(SIGNS_DATA_KEY)
        .save(JSON.stringify(signsData), {
          contentType: 'application/json',
          metadata: {
            cacheControl: 'public, max-age=60'
          }
        })
    })
}
exports.publishSignsData = publishSignsData
