const cloudDatastore = require('./cloud_datastore')
const cloudStorage = require('./cloud_storage')
const validation = require('./validation')

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
    action = publishFile(fileName).then(() =>
      updateApprovalState(fileName, true)
    )
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

function publishFile(fileName) {
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
