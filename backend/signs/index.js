const basicAuth = require('express-basic-auth')
const cors = require('cors')

//
// User-facing
//

var upload
exports.signs_upload = function(req, res) {
  if (!upload) upload = require('./lib/upload').upload
  corsHandler(req, res, function() {
    upload(req, res)
  })
}

var submit
exports.signs_submit = function(req, res) {
  if (!submit) submit = require('./lib/submit').submit
  corsHandler(req, res, function() {
    submit(req, res)
  })
}

//
// Admin
//

const password = process.env.MY_EU_SIGNS_APPROVE_PASSWORD

var admin
exports.signs_admin = function(req, res) {
  if (!password) throw new Error('MY_EU_SIGNS_APPROVE_PASSWORD not set')
  if (!admin) admin = require('./lib/admin').admin
  authHandler(req, res, function() {
    admin(req, res)
  })
}

var approve
exports.signs_approve = function(req, res) {
  if (!password) throw new Error('MY_EU_SIGNS_APPROVE_PASSWORD not set')
  if (!approve) approve = require('./lib/approve').approve
  corsHandler(req, res, function() {
    authHandler(req, res, function() {
      approve(req, res)
    })
  })
}

const authHandler =
  password &&
  basicAuth({
    users: { admin: password },
    challenge: true,
    realm: 'signs.myeu.uk'
  })

const corsHandler = cors({
  contentType: 'application/json',
  origin: ['http://localhost:8080', 'https://www.myeu.uk'],
  methods: ['GET', 'POST']
})
