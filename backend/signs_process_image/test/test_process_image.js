/* global describe it afterEach */

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const processImage = require('../lib/process_image')

describe('processImage', function() {
  const TEST_UUID = '6c4f0ad1-aae1-45d4-b267-563e5fb128b8'
  const testFilePathnames = []

  function setUpTestFile(type, file) {
    const tmpPathname = processImage._makeTmpPathname(TEST_UUID)
    testFilePathnames.push(tmpPathname)
    fs.copyFileSync(path.join(__dirname, 'files', type, file), tmpPathname)
    return tmpPathname
  }

  afterEach(function() {
    testFilePathnames.forEach(pathname => {
      try {
        fs.unlinkSync(pathname)
      } catch (err) {
        if (err.code !== 'ENOENT') throw err
      }
    })
    testFilePathnames.length = 0
  })

  describe('autoRotateImage', function() {
    it('fixes EXIF orientation', async function() {
      const inputPathname = setUpTestFile('orientation', 'landscape_6.jpg')
      const inputMetadata = await sharp(inputPathname).metadata()
      assert(inputMetadata.orientation === 6)

      const outputPathname = inputPathname + '.jpeg'
      testFilePathnames.push(outputPathname)
      await processImage._autoRotateImage(inputPathname, outputPathname)

      const outputMetadata = await sharp(outputPathname).metadata()
      assert(outputMetadata.orientation == null)
    })
  })

  describe('extractExifGpsData', function() {
    it('extracts GPS data when present', async function() {
      const tmpPathname = setUpTestFile('gps', 'DSCN0010.jpg')
      const exifGpsData = await processImage._extractExifGpsData(tmpPathname)
      // Values checked with `exiftool -n test/files/gps/DSCN0010.jpg`
      assert(Math.abs(exifGpsData.exifLatitude - 43.4674483333333) < 1e-6)
      assert(Math.abs(exifGpsData.exifLongitude - 11.8851266666639) < 1e-6)
    })

    it('returns null when GPS data are not present', async function() {
      const tmpPathname = setUpTestFile('orientation', 'landscape_6.jpg')
      const exifGpsData = await processImage._extractExifGpsData(tmpPathname)
      assert(exifGpsData == null)
    })
  })
})
