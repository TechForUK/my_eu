const cloudDatastore = require('./cloud_datastore')

const IMAGE_ROOT = 'https://www.myeu.uk/signs'

const TTL = 60 * 1000
const GRACE = 5 * 1000

exports.list = function signsList(req, res) {
  if (isCacheStale()) {
    fillCache().then(() => sendCachedSigns(res))
  } else {
    sendCachedSigns(res)
  }
}

let expiresAt = null
function isCacheStale() {
  const now = new Date()
  if (expiresAt && now < expiresAt) return false
  expiresAt = new Date(now.getTime() + TTL + GRACE * Math.random())
  return true
}

let cachedSigns = null
function fillCache() {
  return cloudDatastore.datastore
    .runQuery(
      cloudDatastore.datastore
        .createQuery(cloudDatastore.SIGN_KIND)
        .filter('approved', '=', true)
    )
    .then(results => {
      const signs = results[0]
      cachedSigns = signs.map(sign => ({
        latitude: sign.latitude,
        longitude: sign.longitude,
        src: `${IMAGE_ROOT}/${sign[cloudDatastore.datastore.KEY].name}`
      }))
    })
    .catch(error => {
      console.error(error)
    })
}

function sendCachedSigns(res) {
  if (cachedSigns) {
    res.status(200).send({ signs: cachedSigns })
  } else {
    res.status(500).send({ message: 'failed to list' })
  }
}
