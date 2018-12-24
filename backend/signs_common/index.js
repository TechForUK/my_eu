// This file is copied into each of the packages at build time.

exports.NUMBER_REGEXP = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/

exports.UUID_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

// Cloud Datastore
exports.SIGN_KIND = 'sign'

// Follow the getOrCreate pattern from
// https://cloud.google.com/datastore/docs/concepts/transactions#uses_for_transactions
// but instead of returning an existing record, also update it by merging in
// the given data.
exports.datastoreUpsertMerge = function datastoreUpsertMerge(
  datastore,
  kind,
  name,
  data
) {
  const key = datastore.key([kind, name])
  const transaction = datastore.transaction()
  return transaction
    .run()
    .then(() => transaction.get(key))
    .then(results => {
      let entity = { key: key }
      if (results[0]) {
        entity.data = Object.assign(results[0], data)
      } else {
        entity.data = data
      }
      transaction.save(entity)
      return transaction.commit()
    })
    .catch(() => transaction.rollback())
}

// Retry pattern from
// https://cloud.google.com/datastore/docs/concepts/transactions#uses_for_transactions
exports.datastoreWithRetries = function datastoreWithRetries(
  makeRequest,
  delay = 100
) {
  const maxTries = 5
  let currentAttempt = 1

  function tryRequest() {
    return makeRequest().catch(err => {
      if (currentAttempt <= maxTries) {
        // Use exponential backoff
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            ++currentAttempt
            delay *= 2
            tryRequest().then(resolve, reject)
          }, delay)
        })
      }
      throw err
    })
  }

  return tryRequest()
}

// Cloud Storage
exports.SIGNS_BUCKET_NAME = 'signs.myeu.uk'
exports.SIGNS_PROCESSED_BUCKET_NAME = 'signs-processed.myeu.uk'
exports.MAIN_BUCKET_NAME = 'www.myeu.uk'
exports.MAIN_BUCKET_SIGNS_PATH = 'signs'

// Authorization
exports.buildAuthorizationHeader = function(username, password) {
  return 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
}
