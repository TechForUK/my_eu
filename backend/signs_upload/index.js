const cors = require('cors')

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

const corsHandler = cors({
  contentType: 'application/json',
  origin: ['http://localhost:8080', 'https://www.myeu.uk'],
  methods: ['GET', 'POST']
})
