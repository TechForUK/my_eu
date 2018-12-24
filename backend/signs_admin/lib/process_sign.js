const fetch = require('node-fetch')

const {
  SIGN_KIND,
  SIGNS_BUCKET_NAME,
  SIGNS_PROCESSED_BUCKET_NAME,
  UUID_REGEXP,
  datastoreUpsertMerge,
  datastoreWithRetries,
  buildAuthorizationHeader
} = require('./common')
const datastore = require('./datastore')
const storage = require('./storage')

const SIGNS_PROCESS_IMAGE_URL = `https://europe-west1-my-eu-1532800860795.cloudfunctions.net/signs_process_image`

const processImagePassword = process.env.MY_EU_SIGNS_PROCESS_IMAGE_PASSWORD
if (!processImagePassword)
  throw new Error('MY_EU_SIGNS_PROCESS_IMAGE_PASSWORD not set')

exports.processSign = function signsAdminProcessSign(req, res) {
  let fileName = req.body.file_name
  if (!UUID_REGEXP.test(fileName)) {
    return res.status(422).send({ message: 'bad file_name' })
  }
  fileName = fileName.toLowerCase()

  processImage(fileName)
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({ message: 'failed to process sign' })
    })
}

function processImage(fileName) {
  return Promise.all([getInputUrl(fileName), getOutputUrl(fileName)]).then(
    ([inputUrl, outputUrl]) => {
      return fetch(SIGNS_PROCESS_IMAGE_URL, {
        method: 'POST',
        body: JSON.stringify({
          file_name: fileName,
          input_url: inputUrl,
          output_url: outputUrl
        }),
        headers: {
          Authorization: buildAuthorizationHeader(
            'service',
            processImagePassword
          ),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok)
            throw new Error('process image failed: ' + response.statusText)
          return response.json()
        })
        .then(data => updateSign(fileName, data))
    }
  )
}

function getInputUrl(fileName) {
  return storage
    .bucket(SIGNS_BUCKET_NAME)
    .file(fileName)
    .getSignedUrl({
      action: 'read',
      expires: new Date().getTime() + 60 * 60 * 1000
    })
    .then(response => response[0])
}

function getOutputUrl(fileName) {
  return storage
    .bucket(SIGNS_PROCESSED_BUCKET_NAME)
    .file(fileName)
    .getSignedUrl({
      action: 'write',
      contentType: 'image/jpeg',
      expires: new Date().getTime() + 60 * 60 * 1000
    })
    .then(response => response[0])
}

function updateSign(fileName, data) {
  const signData = data.exifGpsData || {}
  signData.processed = true

  return datastoreWithRetries(function createOrUpdateSign() {
    return datastoreUpsertMerge(datastore, SIGN_KIND, fileName, signData)
  })
}
