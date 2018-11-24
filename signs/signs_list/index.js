const cors = require('cors')
const Datastore = require('@google-cloud/datastore')

const datastore = new Datastore()

const IMAGE_ROOT = 'https://www.myeu.uk/signs'

const KIND = 'sign'

const TTL = 60 * 1000
const GRACE = 5 * 1000

exports.signs_list = function(req, res) {
  corsHandler(req, res, function() {
    handleListRequest(req, res)
  })
}

const corsHandler = cors({
  contentType: 'application/json',
  origin: ['http://localhost:8080', 'https://www.myeu.uk'],
  methods: ['POST']
})

let cachedSigns = null
let expiresAt = null
function isCacheStale() {
  const now = new Date()
  if (expiresAt && now < expiresAt) return false
  expiresAt = new Date(now.getTime() + TTL + GRACE * Math.random())
  return true
}

function handleListRequest(req, res) {
  if (isCacheStale()) {
    fillCache().then(() => sendCachedSigns(res))
  } else {
    sendCachedSigns(res)
  }
}

function fillCache() {
  return datastore
    .runQuery(datastore.createQuery(KIND).filter('approved', '=', true))
    .then(results => {
      const signs = results[0]
      cachedSigns = signs.map(sign => ({
        latitude: sign.latitude,
        longitude: sign.longitude,
        src: `${IMAGE_ROOT}/${sign[datastore.KEY].name}`
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
