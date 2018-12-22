const {
  MAIN_BUCKET_NAME,
  MAIN_BUCKET_SIGNS_PATH,
  SIGN_KIND,
  SIGNS_BUCKET_NAME,
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

  let action
  if (approved) {
    action = publishImage(fileName)
      .then(() => updateApprovalState(fileName, true))
      .then(() => {
        publishSignsData()
      })
  } else {
    action = updateApprovalState(fileName, false)
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
    .bucket(SIGNS_BUCKET_NAME)
    .file(fileName)
    .copy(
      storage
        .bucket(MAIN_BUCKET_NAME)
        .file(`${MAIN_BUCKET_SIGNS_PATH}/${fileName}`)
    )
}

function updateApprovalState(fileName, approved) {
  const transaction = datastore.transaction()
  const signKey = datastore.key([SIGN_KIND, fileName])

  return transaction
    .run()
    .then(() => transaction.get(signKey))
    .then(results => {
      const sign = results[0]
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
          sign.latitude,
          sign.longitude,
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
