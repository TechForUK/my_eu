const { Storage } = require('@google-cloud/storage')

exports.storage = new Storage()

exports.SIGNS_BUCKET_NAME = 'signs.myeu.uk'
exports.MAIN_BUCKET_NAME = 'www.myeu.uk'
exports.MAIN_BUCKET_SIGNS_PATH = 'signs'
