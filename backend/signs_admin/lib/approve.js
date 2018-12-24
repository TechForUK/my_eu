const {
  MAIN_BUCKET_NAME,
  MAIN_BUCKET_SIGNS_PATH,
  SIGN_KIND,
  SIGNS_PROCESSED_BUCKET_NAME,
  UUID_REGEXP
} = require('./common')
const datastore = require('./datastore')
const storage = require('./storage')

const SIGNS_DATA_KEY = `${MAIN_BUCKET_SIGNS_PATH}.json`

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
      .then(() => {
        publishSignsData()
      })
  } else {
    action = updateAfterModeration(fileName, null, false)
  }
  action
    .then(() => {
      res.status(200).send()
    })
    .catch(error => {
      console.error(error)
      res.status(500).send({ message: 'failed to approve' })
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

  return transaction
    .run()
    .then(() => transaction.get(signKey))
    .then(results => {
      const sign = results[0]
      sign.useExif = useExif
      if (useExif && !('exifLatitude' in sign))
        throw new Error('Cannot use exif')
      sign.approved = approved
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

function publishSignsData() {
  return datastore
    .runQuery(datastore.createQuery(SIGN_KIND).filter('approved', '=', true))
    .then(results => {
      const signs = results[0]
      const signsData = {
        columns: ['id', 'latitude', 'longitude', 'title'],
        data: signs.map(sign => [
          sign[datastore.KEY].name,
          sign.useExif ? sign.exifLatitude : sign.deviceLatitude,
          sign.useExif ? sign.exifLongitude : sign.deviceLongitude,
          sign.title
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
