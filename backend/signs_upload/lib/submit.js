const { SIGN_KIND, NUMBER_REGEXP, UUID_REGEXP } = require('./common')
const datastore = require('./datastore')

exports.submit = function signsSubmit(req, res) {
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

  const title = (req.body.title || '').trim() || null
  if (title && !/^.{0,255}$/.test(title)) {
    return res.status(422).send({ message: 'bad title' })
  }

  const signKey = datastore.key([SIGN_KIND, fileName])
  const sign = {
    key: signKey,
    data: {
      latitude,
      longitude,
      title,
      approved: null
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
