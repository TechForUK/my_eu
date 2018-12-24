const fetch = require('node-fetch')

const {
  SIGN_KIND,
  NUMBER_REGEXP,
  UUID_REGEXP,
  datastoreUpsertMerge,
  datastoreWithRetries
} = require('./common')
const datastore = require('./datastore')

exports.submit = function signsSubmit(req, res) {
  let fileName = req.body.file_name
  if (!UUID_REGEXP.test(fileName)) {
    return res.status(422).send({ message: 'bad file_name' })
  }
  fileName = fileName.toLowerCase()

  const latitude = req.body.latitude
  if (!NUMBER_REGEXP.test(latitude)) {
    return res.status(422).send({ message: 'bad latitude' })
  }

  const longitude = req.body.longitude
  if (!NUMBER_REGEXP.test(longitude)) {
    return res.status(422).send({ message: 'bad longitude' })
  }

  const title = (req.body.title || '').trim() || null
  if (title && !/^.{0,255}$/.test(title)) {
    return res.status(422).send({ message: 'bad title' })
  }

  datastoreWithRetries(function createOrUpdateSign() {
    return datastoreUpsertMerge(datastore, SIGN_KIND, fileName, {
      deviceLatitude: latitude,
      deviceLongitude: longitude,
      title,
      uploadedAt: new Date(),
      approved: null
    })
  })
    .then(() => notify(fileName))
    .then(() => {
      res.status(201).send()
    })
    .catch(error => {
      console.error(error)
      res.status(500).send({ message: 'failed to insert' })
    })
}

const NOTIFY_TIMEOUT = 3 * 1000
const SIGNS_ADMIN_URL = `https://europe-west1-my-eu-1532800860795.cloudfunctions.net/signs_admin`

function notify(fileName) {
  const webhook = process.env.MY_EU_SIGNS_NOTIFY_WEBHOOK
  if (!webhook) return
  return fetch(webhook, {
    method: 'POST',
    body: JSON.stringify({
      text: `A new sign has been submitted: <${SIGNS_ADMIN_URL}#my-eu-card-${fileName}|moderate>.`
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: NOTIFY_TIMEOUT
  })
    .then(response => {
      if (!response.ok)
        throw new Error('Unexpected webhook response: ' + response.status)
    })
    .catch(err => {
      console.error(err) // just log it; don't fail the request
    })
}
