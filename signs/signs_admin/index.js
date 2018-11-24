const basicAuth = require('express-basic-auth')
const Datastore = require('@google-cloud/datastore')
const { Storage } = require('@google-cloud/storage')

const datastore = new Datastore()
const storage = new Storage()

const BUCKET_NAME = 'signs.myeu.uk'

const KIND = 'sign'
const LIMIT = 30

exports.signs_admin = function(req, res) {
  authHandler(req, res, function() {
    handleAdminRequest(req, res)
  })
}

const password = process.env.MY_EU_SIGNS_APPROVE_PASSWORD
if (!password) throw new Error('MY_EU_SIGNS_APPROVE_PASSWORD not set')
const authHandler = basicAuth({
  users: { admin: password },
  challenge: true,
  realm: 'signs.myeu.uk'
})

const SIGNS_APPROVE_URL = `https://europe-west1-my-eu-1532800860795.cloudfunctions.net/signs_approve`

function handleAdminRequest(req, res) {
  const query = datastore
    .createQuery(KIND)
    .filter('approved', '=', null)
    .limit(LIMIT)
  return datastore
    .runQuery(query)
    .then(getSignedUrls)
    .then(signs => {
      res.send(renderSigns(signs))
    })
    .catch(error => {
      console.error(error)
      res.status(500).send({ message: 'failed to list' })
    })
}

function getSignedUrls(results) {
  const bucket = storage.bucket(BUCKET_NAME)
  return Promise.all(
    results[0].map(sign => {
      const fileName = sign[datastore.KEY].name
      return bucket
        .file(fileName)
        .getSignedUrl({
          action: 'read',
          expires: new Date().getTime() + 60 * 60 * 1000
        })
        .then(response => {
          sign.url = response[0]
          return sign
        })
    })
  )
}

function renderSigns(signs) {
  const authorization =
    'Basic ' + Buffer.from('admin:' + password).toString('base64')
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>myeu.uk - signs - admin</title>
    <script>
      function myEuModerate(name, approve) {
        var $card = $('#my-eu-card-' + name)

        function toggleButtons(disabled) {
          $card.find('button').prop('disabled', disabled)
        }
        toggleButtons(true)

        fetch('${SIGNS_APPROVE_URL}', {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': '${authorization}',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ file_name: name, approve: approve })
        }).then((response) => {
          if (response.status === 200) {
            $card.remove()
            return
          }
          throw new Error('Unexpected response: ' + response.status)
        }).catch((error) => {
          alert(error)
          toggleButtons(false)
        })
      }
    </script>
  </head>
  <body>
    <div class="container">
      <h1>Unmoderated Signs</h1>
      ${signs.map(renderSign)}
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  </body>
</html>`
}

function renderSign(sign) {
  const fileName = sign[datastore.KEY].name
  return `
<div id="my-eu-card-${fileName}" class="card">
  <img src="${sign.url}" class="img-card-top">
  <div class="card-body text-center">
    Longitude ${sign.longitude} / Latitude ${sign.latitude}
  </div>
  <div class="card-footer">
    <button class="btn btn-warning" onClick="myEuModerate('${fileName}', false)">Reject</button>
    <button class="btn btn-success float-right" onClick="myEuModerate('${fileName}', true)">Approve</button>
  </div>
</div>`
}
