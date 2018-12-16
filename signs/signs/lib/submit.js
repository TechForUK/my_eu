const cloudDatastore = require('./cloud_datastore')
const validation = require('./validation')

exports.submit = function signsSubmit(req, res) {
  let fileName = req.body.file_name
  if (!validation.UUID_REGEXP.test(fileName)) {
    return res.status(422).send({ message: 'bad file_name' })
  }
  fileName = fileName.toLowerCase()

  const latitude = req.body.latitude
  if (!validation.NUMBER_REGEXP.test(latitude)) {
    return res.status(422).send({ message: 'bad latitude' })
  }

  const longitude = req.body.longitude
  if (!validation.NUMBER_REGEXP.test(longitude)) {
    return res.status(422).send({ message: 'bad longitude' })
  }

  const signKey = cloudDatastore.datastore.key([
    cloudDatastore.SIGN_KIND,
    fileName
  ])
  const sign = {
    key: signKey,
    data: {
      latitude,
      longitude,
      approved: null
    }
  }
  cloudDatastore.datastore
    .save(sign)
    .then(() => {
      res.status(201).send()
    })
    .catch(error => {
      console.error(error)
      res.status(500).send({ message: 'failed to insert' })
    })
}
