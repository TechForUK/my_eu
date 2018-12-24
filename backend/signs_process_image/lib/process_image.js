const ExifImage = require('exif').ExifImage
const fs = require('fs')
const os = require('os')
const path = require('path')
const sharp = require('sharp')
const fetch = require('node-fetch')

// .finally is not supported in node 6 or node 8 runtimes.
const promisePrototypeFinally = require('promise.prototype.finally')
promisePrototypeFinally.shim()

const { UUID_REGEXP } = require('./common')

exports.processImage = function signsProcessImage(req, res) {
  console.log(req.body)
  let fileName = req.body.file_name
  if (!UUID_REGEXP.test(fileName)) {
    return res.status(422).send({ message: 'bad file_name' })
  }
  fileName = fileName.toLowerCase()

  let inputUrl = req.body.input_url
  if (!inputUrl) {
    return res.status(422).send({ message: 'missing input_url' })
  }

  let outputUrl = req.body.output_url
  if (!outputUrl) {
    return res.status(422).send({ message: 'missing output_url' })
  }

  processImage(fileName, inputUrl, outputUrl)
    .then(exifGpsData => {
      res.status(200).send({ exifGpsData })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({ message: 'failed to process image' })
    })
}

function processImage(fileName, inputUrl, outputUrl) {
  const tmpPathname = makeTmpPathname(fileName)
  return downloadImage(inputUrl, tmpPathname)
    .then(() => autoRotateImageAndUpload(tmpPathname, outputUrl))
    .then(() => extractExifGpsData(tmpPathname))
    .finally(() => fs.unlinkSync(tmpPathname))
}

function makeTmpPathname(fileName) {
  return path.join(os.tmpdir(), fileName)
}
exports._makeTmpPathname = makeTmpPathname

function downloadImage(inputUrl, tmpPathname) {
  return fetch(inputUrl).then(response => {
    return new Promise((resolve, reject) => {
      const destination = fs.createWriteStream(tmpPathname)
      destination.on('finish', resolve)
      destination.on('error', reject)
      response.body.on('error', reject)
      response.body.pipe(destination)
    })
  })
}

function autoRotateImageAndUpload(inputPathname, outputUrl) {
  const outputPathname = inputPathname + '.jpeg'
  return autoRotateImage(inputPathname, outputPathname)
    .then(() => uploadImage(outputPathname, outputUrl))
    .finally(() => fs.unlinkSync(outputPathname))
}

function autoRotateImage(inputPathname, outputPathname) {
  return sharp(inputPathname)
    .limitInputPixels(0x2fff * 0x2fff) // About 12k x 12k pixels
    .rotate()
    .jpeg({ force: true })
    .toFile(outputPathname)
}
exports._autoRotateImage = autoRotateImage

function uploadImage(pathname, outputUrl) {
  const inputStream = fs.createReadStream(pathname)
  return fetch(outputUrl, {
    method: 'PUT',
    body: inputStream,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  }).then(response => {
    if (response.status >= 400) {
      throw new Error('Upload failed with status ' + response.status)
    }
  })
}

function extractExifGpsData(tmpPathname) {
  return new Promise(function(resolve, reject) {
    return new ExifImage({ image: tmpPathname }, function(err, exifData) {
      if (err) return reject(err)
      resolve(exifData)
    })
  }).then(exifData => {
    const gps = exifData.gps
    if (!gps) return
    const exifLatitude = convertExifGpsToDegrees(
      gps.GPSLatitude,
      gps.GPSLatitudeRef
    )
    const exifLongitude = convertExifGpsToDegrees(
      gps.GPSLongitude,
      gps.GPSLongitudeRef
    )
    if (!exifLatitude || !exifLongitude) return
    return { exifLatitude, exifLongitude }
  })
}
exports._extractExifGpsData = extractExifGpsData

function convertExifGpsToDegrees(value, reference) {
  // This is based on ExifTool's ToDegrees function.
  if (!value || !value.length || !reference) return null
  const [d, m, s] = value
  let degrees = d + ((m || 0) + (s || 0) / 60) / 60
  if (/(S|W)$/i.test(reference)) degrees = -degrees
  return degrees
}
