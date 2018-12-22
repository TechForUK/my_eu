const basicAuth = require('express-basic-auth')
const cors = require('cors')

const password = process.env.MY_EU_SIGNS_APPROVE_PASSWORD
if (!password) throw new Error('MY_EU_SIGNS_APPROVE_PASSWORD not set')

let admin
exports.signs_admin = function(req, res) {
  if (!admin) admin = require('./lib/admin').admin
  authHandler(req, res, function() {
    admin(req, res)
  })
}

let approve
exports.signs_approve = function(req, res) {
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
