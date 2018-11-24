const cors = require('cors')
const basicAuth = require('express-basic-auth')
const Datastore = require('@google-cloud/datastore')
const { Storage } = require('@google-cloud/storage')

const datastore = new Datastore()
const storage = new Storage()

const INPUT_BUCKET_NAME = 'signs.myeu.uk'
const OUTPUT_BUCKET_NAME = 'www.myeu.uk'
const OUTPUT_PATH = 'signs'

const KIND = 'sign'
const UUID_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

exports.signs_approve = function(req, res) {
  corsHandler(req, res, function() {
    authHandler(req, res, function() {
      handleApproveSignRequest(req, res)
    })
  })
}

const password = process.env.MY_EU_SIGNS_APPROVE_PASSWORD
if (!password) throw new Error('MY_EU_SIGNS_APPROVE_PASSWORD not set')
const authHandler = basicAuth({ users: { admin: password } })

const corsHandler = cors({
  contentType: 'application/json',
  origin: ['http://localhost:8080', 'https://www.myeu.uk'],
  methods: ['POST']
})

function handleApproveSignRequest(req, res) {
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
  return storage
    .bucket(INPUT_BUCKET_NAME)
    .file(fileName)
    .copy(storage.bucket(OUTPUT_BUCKET_NAME).file(`${OUTPUT_PATH}/${fileName}`))
}

function updateApprovalState(fileName, approved) {
  const transaction = datastore.transaction()
  const signKey = datastore.key([KIND, fileName])

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
