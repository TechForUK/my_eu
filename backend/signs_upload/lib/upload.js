const uuidv4 = require('uuid/v4')

const { SIGNS_BUCKET_NAME } = require('./common')
const storage = require('./storage')

exports.upload = function signsUpload(req, res) {
  const bucket = storage.bucket(SIGNS_BUCKET_NAME)
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
