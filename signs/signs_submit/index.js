const cors = require('cors')
const Datastore = require('@google-cloud/datastore')

const datastore = new Datastore()

const KIND = 'sign'
const UUID_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
const NUMBER_REGEXP = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/

exports.signs_submit = function(req, res) {
  corsHandler(req, res, function() {
    submitSign(req, res)
  })
}

const corsHandler = cors({
  contentType: 'application/json',
  origin: ['http://localhost:8080', 'https://www.myeu.uk'],
  methods: ['POST']
})

function submitSign(req, res) {
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

  const signKey = datastore.key([KIND, fileName])
  const sign = {
    key: signKey,
    data: {
      location: { latitude, longitude },
      approved: false
    }
  }
  datastore
    .save(sign)
    .then(() => {
      res.status(201).send()
    })
    .catch(error => {
      console.error(error)
      res.status(500).send({ message: 'failed to insert' })
    })
}
