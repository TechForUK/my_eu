const {
  MAIN_BUCKET_NAME,
  MAIN_BUCKET_SIGNS_PATH,
  SIGN_KIND,
  SIGNS_PROCESSED_BUCKET_NAME,
  UUID_REGEXP
} = require('./common')
const datastore = require('./datastore')
const { geocodeSign } = require('./geocode')
const { publishSignsData } = require('./publish')
const storage = require('./storage')

function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

exports.approve = function signsApprove(req, res) {
  let fileName = req.body.file_name
  if (!UUID_REGEXP.test(fileName)) {
    return res.status(422).send({ message: 'bad file_name' })
  }
  fileName = fileName.toLowerCase()

  let approved = req.body.approve
  if (approved !== true && approved !== false) {
    return res.status(422).send({ message: 'bad approve' })
  }

  let useExif = req.body.use_exif
  if (useExif !== true && useExif !== false) {
    return res.status(422).send({ message: 'bad useExif' })
  }

  let action
  if (approved) {
    action = publishImage(fileName)
      .then(() => updateAfterModeration(fileName, useExif, true))
      // datastore is eventually consistent for the sign listing query
      .then(() => delay(2000))
      .then(() => publishSignsData())
  } else {
    action = updateAfterModeration(fileName, null, false)
  }
  action
    .then(() => {
      res.status(200).send()
    })
    .catch(error => {
      if (error.message === 'sign not found') {
        res.status(404).send()
      } else if (error.message === 'geolocation failed') {
        res.status(500).send({ message: error.message })
      } else {
        console.error(error)
        res.status(500).send({ message: 'failed to approve' })
      }
    })
}

function publishImage(fileName) {
  return storage
    .bucket(SIGNS_PROCESSED_BUCKET_NAME)
    .file(fileName)
    .copy(
      storage
        .bucket(MAIN_BUCKET_NAME)
        .file(`${MAIN_BUCKET_SIGNS_PATH}/${fileName}`)
    )
}

function updateAfterModeration(fileName, useExif, approved) {
  const transaction = datastore.transaction()
  const signKey = datastore.key([SIGN_KIND, fileName])
  let sign

  return transaction
    .run()
    .then(() => transaction.get(signKey))
    .then(results => {
      sign = results[0]
      if (!sign) throw new Error('sign not found')

      sign.useExif = useExif
      if (useExif && !('exifLatitude' in sign))
        throw new Error('Cannot use exif')
      sign.approved = approved

      if (approved) return geocodeSign(sign)
    })
    .then(() => {
      transaction.save({
        key: signKey,
        data: sign
      })

      return transaction.commit()
    })
    .catch(error => {
      transaction.rollback()
      throw error
    })
}
