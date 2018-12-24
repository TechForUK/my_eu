const basicAuth = require('express-basic-auth')

let admin
exports.signs_admin = function(req, res) {
  if (!admin) admin = require('./lib/admin').admin
  authHandler(req, res, function(err) {
    if (err) throw err
    admin(req, res)
  })
}

let approve
exports.signs_approve = function(req, res) {
  if (!approve) approve = require('./lib/approve').approve
  authHandler(req, res, function(err) {
    if (err) throw err
    approve(req, res)
  })
}

let processSign
exports.signs_process = function(req, res) {
  if (!processSign) processSign = require('./lib/process_sign').processSign
  authHandler(req, res, function(err) {
    if (err) throw err
    processSign(req, res)
  })
}

const adminPassword = process.env.MY_EU_SIGNS_ADMIN_PASSWORD
if (!adminPassword) throw new Error('MY_EU_SIGNS_ADMIN_PASSWORD not set')

const authHandler =
  adminPassword &&
  basicAuth({
    users: { admin: adminPassword },
    challenge: true,
    realm: 'signs_admin.myeu.uk'
  })
