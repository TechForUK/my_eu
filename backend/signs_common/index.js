// This file is copied into each of the packages at build time.

exports.NUMBER_REGEXP = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/

exports.UUID_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

// Cloud Datastore
exports.SIGN_KIND = 'sign'

// Cloud Storage
exports.SIGNS_BUCKET_NAME = 'signs.myeu.uk'
exports.MAIN_BUCKET_NAME = 'www.myeu.uk'
exports.MAIN_BUCKET_SIGNS_PATH = 'signs'
