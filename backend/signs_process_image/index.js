const basicAuth = require('express-basic-auth')

const processImage = require('./lib/process_image').processImage

exports.signs_process_image = function(req, res) {
  authHandler(req, res, function(err) {
    if (err) throw err
    processImage(req, res)
  })
}

const password = process.env.MY_EU_SIGNS_PROCESS_IMAGE_PASSWORD
if (!password) throw new Error('MY_EU_SIGNS_PROCESS_IMAGE_PASSWORD not set')

const authHandler =
  password &&
  basicAuth({
    users: { service: password },
    challenge: true,
    realm: 'signs_process_image.myeu.uk'
  })
