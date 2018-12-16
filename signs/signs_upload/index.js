const cors = require('cors')
const { Storage } = require('@google-cloud/storage')
const uuidv4 = require('uuid/v4')

const storage = new Storage()

const BUCKET_NAME = 'signs.myeu.uk'

exports.signs_upload = function(req, res) {
  corsHandler(req, res, function() {
    makeSignedUrl(req, res)
  })
}

const corsHandler = cors({
  origin: ['http://localhost:8080', 'https://www.myeu.uk'],
  methods: ['GET']
})

function makeSignedUrl(req, res) {
  const bucket = storage.bucket(BUCKET_NAME)
  const fileName = uuidv4()
  const file = bucket.file(fileName)

  // It seems we must constrain contentType, and it has to match exactly.
  if (!/^image\/.{1,255}$/.test(req.query.content_type)) {
    return res.status(422).send({ message: 'bad content_type' })
  }

  file
    .getSignedUrl({
      action: 'write',
      contentType: req.query.content_type,
      expires: new Date().getTime() + 60 * 60 * 1000
    })
    .then(function(response) {
      res.send({ fileName, url: response[0] })
    })
    .catch(function(error) {
      console.error(error)
      res.status(500).send({ message: 'link generation failed' })
    })
}
