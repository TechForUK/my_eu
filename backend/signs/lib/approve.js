const cloudDatastore = require('./cloud_datastore')
const cloudStorage = require('./cloud_storage')
const validation = require('./validation')

const SIGNS_DATA_KEY = `${cloudStorage.MAIN_BUCKET_SIGNS_PATH}.json`

exports.approve = function signsApprove(req, res) {
  let fileName = req.body.file_name
  if (!validation.UUID_REGEXP.test(fileName)) {
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
  return cloudStorage.storage
    .bucket(cloudStorage.SIGNS_BUCKET_NAME)
    .file(fileName)
    .copy(
      cloudStorage.storage
        .bucket(cloudStorage.MAIN_BUCKET_NAME)
        .file(`${cloudStorage.MAIN_BUCKET_SIGNS_PATH}/${fileName}`)
    )
}

function updateApprovalState(fileName, approved) {
  const transaction = cloudDatastore.datastore.transaction()
  const signKey = cloudDatastore.datastore.key([
    cloudDatastore.SIGN_KIND,
    fileName
  ])

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
  return cloudDatastore.datastore
    .runQuery(
      cloudDatastore.datastore
        .createQuery(cloudDatastore.SIGN_KIND)
        .filter('approved', '=', true)
    )
    .then(results => {
      const signs = results[0]
      const signsData = {
        columns: ['id', 'latitude', 'longitude', 'title'],
        data: signs.map(sign => [
          sign[cloudDatastore.datastore.KEY].name,
          sign.latitude,
          sign.longitude,
          sign.title
        ])
      }
      return cloudStorage.storage
        .bucket(cloudStorage.MAIN_BUCKET_NAME)
        .file(SIGNS_DATA_KEY)
        .save(JSON.stringify(signsData), {
          contentType: 'application/json',
          metadata: {
            cacheControl: 'public, max-age=60'
          }
        })
    })
}
