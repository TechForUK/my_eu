/* global alert, fetch, FileReader, Rollbar */

import React from 'react'
import ExifReader from 'exifreader'
import $ from 'jquery'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import ReactGA from 'react-ga'

const SIGNS_UPLOAD_URL =
  'https://europe-west1-my-eu-1532800860795.cloudfunctions.net/signs_upload'

const SIGNS_SUBMIT_URL =
  'https://europe-west1-my-eu-1532800860795.cloudfunctions.net/signs_submit'

const BAD_TITLE_MESSAGE = 'bad title'

class Capture extends React.Component {
  constructor(props) {
    super(props)
    this.cameraFileRef = React.createRef()
    this.existingFileRef = React.createRef()
    this.handleUpload = this.handleUpload.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <p className="lead">Help us add more projects to the map!</p>
        <p>
          If you find a sign, plaque or sticker that mentions EU support for a
          project, you can take a picture of it using your smartphone or tablet,
          and we&apos;ll get it onto the map.
        </p>
        <form className="text-center pt-3">
          <div>
            <label
              htmlFor="my-eu-signs-upload-camera-file"
              className="my-eu-signs-upload"
            >
              <i className="fas fa-camera" />
              <input
                ref={this.cameraFileRef}
                onChange={this.handleUpload}
                id="my-eu-signs-upload-camera-file"
                name="file"
                type="file"
                accept="image/*"
                capture="environment"
              />
              <p>Take a Picture of a Sign</p>
            </label>
          </div>
          <div>
            <label
              htmlFor="my-eu-signs-upload-existing-file"
              className="my-eu-signs-upload"
            >
              <input
                ref={this.existingFileRef}
                onChange={this.handleUpload}
                id="my-eu-signs-upload-existing-file"
                name="file"
                type="file"
                accept="image/*"
              />
              <p>Or Upload an Existing Photo</p>
            </label>
          </div>
        </form>
      </React.Fragment>
    )
  }

  handleUpload() {
    const file =
      this.cameraFileRef.current.files[0] ||
      this.existingFileRef.current.files[0]
    this.props.onUpload(file)
  }
}

Capture.propTypes = {
  onUpload: PropTypes.func
}

const Location = () => {
  return (
    <div className="mt-3 mb-3">
      <p className="lead text-center">Finding you on the map&hellip;</p>
      <p className="text-center">
        <i
          className="fas fa-location-arrow text-secondary"
          style={{ fontSize: '5rem' }}
        />
      </p>
      <p className="text-muted text-center">
        We need access to your current location so we can put your photo on the
        map.
      </p>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}

const Terms = () => {
  return (
    <React.Fragment>
      <h5 className="mt-3">Terms and Conditions</h5>
      <p>
        You retain your rights to any content you submit through this form
        (&ldquo;Content&rdquo;).
      </p>
      <p>
        By submitting this form, you grant us a worldwide, non-exclusive,
        royalty-free license (with the right to sublicense) to use, copy,
        reproduce, process, adapt, modify, publish, transmit, display and
        distribute such Content in any and all media or distribution methods
        (now known or later developed). This license authorises us to make your
        Content available to the rest of the world and to let others do the
        same. You agree that this license includes the right for myeu.uk to
        provide, promote, and improve myeu.uk and to make Content submitted to
        or through myeu.uk available to other companies, organisations or
        individuals for the syndication, broadcast, distribution, promotion or
        publication of such Content on other media and services. Such additional
        uses by myeu.uk, or other companies, organisations or individuals, may
        be made with no compensation paid to you with respect to the Content
        that you submit, post, transmit or otherwise make available through
        myeu.uk.
      </p>
      <p>
        You understand that we may modify or adapt your Content as it is
        distributed, syndicated, published, or broadcast by us and our partners
        and/or make changes to your Content in order to adapt the Content to
        different media.
      </p>
      <p>
        You represent and warrant that you have, or have obtained, all rights,
        licenses, consents, permissions, power and/or authority necessary to
        grant the rights granted herein for any Content that you submit. You
        agree that such Content will not contain material subject to copyright
        or other proprietary rights, unless you have necessary permission or are
        otherwise legally entitled to post the material and to grant myeu.uk the
        license described above.
      </p>
    </React.Fragment>
  )
}

class Confirmation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showTerms: false
    }

    this.nameRef = React.createRef()
    this.termsRef = React.createRef()

    this.toggleTerms = this.toggleTerms.bind(this)
    this.handleRetryGeolocation = this.handleRetryGeolocation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    let positionInfo
    if (!this.props.position) {
      let positionMessage
      if (this.props.exifPosition) {
        positionMessage = (
          <p>
            <i className="fas fa-info-circle text-info" />
            &nbsp; {this.props.positionErrorMessage}
            &nbsp; We&apos;ll try to use the location information from your
            photo instead, but it may be less accurate than the location
            information from your device.
          </p>
        )
      } else {
        positionMessage = (
          <p>
            <i className="fas fa-exclamation-triangle text-warning" />
            &nbsp; {this.props.positionErrorMessage}
            &nbsp; We may be able to find a location manually, but if not we
            won&apos;t be able to approve your submission. Please provide as
            much information as possible in the caption field to help us work
            out where your photo is from, or try again.{' '}
          </p>
        )
      }
      positionInfo = (
        <div className="card mb-3">
          <div className="card-body bg-light">
            {positionMessage}
            <button
              className="btn btn-secondary"
              onClick={this.handleRetryGeolocation}
            >
              Try to find my location again.
            </button>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        {positionInfo}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="my-eu-signs-title">Caption (Optional)</label>
            <input
              ref={this.nameRef}
              type="text"
              className="form-control"
              id="my-eu-signs-title"
              aria-describedby="my-eu-signs-title-help"
            />
            <small className="form-text text-muted" id="my-eu-signs-title-help">
              We&apos;ll display this with your photo on the map.
            </small>
          </div>
          <div className="form-check">
            <input
              ref={this.termsRef}
              className="form-check-input"
              type="checkbox"
              value=""
              id="my-eu-signs-confirm"
            />
            <label className="form-check-label" htmlFor="my-eu-signs-confirm">
              I understand and agree to the{' '}
              <a href="#" onClick={this.toggleTerms}>
                terms and conditions
              </a>
              .
            </label>
            {this.state.showTerms && <Terms />}
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Add to the Map
            </button>
          </div>
        </form>
      </React.Fragment>
    )
  }

  handleRetryGeolocation(event) {
    event.preventDefault()
    this.props.onRetryGeolocation()
  }

  toggleTerms(event) {
    event.preventDefault()
    this.setState({ showTerms: !this.state.showTerms })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.termsRef.current.checked) {
      alert('Please confirm your acceptance of the terms.')
      return
    }

    this.props.onConfirm(this.nameRef.current.value)
  }
}

Confirmation.propTypes = {
  position: PropTypes.object,
  positionErrorMessage: PropTypes.string,
  exifPosition: PropTypes.object,
  onRetryGeolocation: PropTypes.func,
  onConfirm: PropTypes.func
}

const Uploading = () => {
  return (
    <div className="mt-5 mb-5">
      <p className="lead text-center">Uploading your photo&hellip;</p>
      <p className="text-center">
        <i
          className="fas fa-cloud-upload-alt text-secondary"
          style={{ fontSize: '5rem' }}
        />
      </p>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}

const FinishedMessage = ({ success, submitErrorMessage }) => {
  function closeModal() {
    $('#my-eu-signs-modal').modal('hide')
  }

  let message
  if (success) {
    message = (
      <React.Fragment>
        <p className="lead">
          Thanks! We will review your submission and get it onto the map as soon
          as we can.
        </p>
        <p>If you find more signs, please keep them coming!</p>
      </React.Fragment>
    )
  } else {
    if (submitErrorMessage === BAD_TITLE_MESSAGE) {
      message = (
        <p>
          Sorry, the caption must be at most 255 characters and all on one line.
          Please try again.
        </p>
      )
    } else {
      message = (
        <p>
          Sorry, something went wrong with the upload. Please try again, and if
          this problem persists, contact us via the about page.
        </p>
      )
    }
  }

  return (
    <div className="mt-5 mb-5">
      {message}
      <p className="text-center">
        <button className="btn btn-primary" onClick={closeModal}>
          Back to the Map
        </button>
      </p>
    </div>
  )
}

FinishedMessage.propTypes = {
  success: PropTypes.bool,
  submitErrorMessage: PropTypes.string
}

const GEOLOCATION_NOT_SUPPORTED = 'This device does not support geolocation.'
// From https://developer.mozilla.org/en-US/docs/Web/API/PositionError
const GEOLOCATION_ERRORS = {
  1: "You haven't allowed myeu.uk to use your location.",
  2: 'There was an error in getting your location. Please try again.',
  3: 'It took too long to get your location, so we gave up. Please try again.'
}

class Signs extends React.Component {
  constructor(props) {
    super(props)

    this.file = null
    this.state = {
      haveFile: false,
      uploadInfo: null,
      position: null,
      positionErrorMessage: null,
      exifPosition: null,
      confirmed: false,
      finished: false,
      submitErrorMessage: null
    }

    this.handleUpload = this.handleUpload.bind(this)
    this.handleRetryGeolocation = this.handleRetryGeolocation.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  render() {
    if (this.state.finished) {
      return (
        <FinishedMessage
          success={this.state.finished === 'success'}
          submitErrorMessage={this.state.submitErrorMessage}
        />
      )
    } else if (!this.state.haveFile) {
      return <Capture onUpload={this.handleUpload} />
    } else if (
      !(this.state.position || this.state.positionErrorMessage) ||
      !this.state.uploadInfo
    ) {
      return <Location />
    } else if (!this.state.confirmed) {
      return (
        <Confirmation
          position={this.state.position}
          positionErrorMessage={this.state.positionErrorMessage}
          exifPosition={this.state.exifPosition}
          onRetryGeolocation={this.handleRetryGeolocation}
          onConfirm={this.handleConfirm}
        />
      )
    } else {
      return <Uploading />
    }
  }

  handleUpload(file) {
    this.track('Upload')
    this.file = file
    this.setState({ haveFile: true })
    this.prepareUploadAndGeolocate()
  }

  handleRetryGeolocation() {
    this.track('Retried Geolocation')
    this.setState({
      uploadInfo: null,
      position: null,
      positionErrorMessage: null,
      exifPosition: null
    })
    this.prepareUploadAndGeolocate()
  }

  handleConfirm(title) {
    this.track('Confirm')
    this.setState({ confirmed: true, title })
    this.uploadFile()
      .then(() => {
        this.track('Success')
        this.setState({ finished: 'success' })
      })
      .catch(error => {
        if (error.message === BAD_TITLE_MESSAGE) {
          this.setState({
            finished: 'error',
            submitErrorMessage: BAD_TITLE_MESSAGE
          })
          return
        }
        this.track('Error')
        this.setState({ finished: 'error' })
        throw error
      })
  }

  prepareUploadAndGeolocate() {
    return Promise.all([
      this.prepareUpload(),
      this.geolocate(),
      this.extractLocationFromFile()
    ])
      .then(
        ([uploadInfo, { position, positionErrorMessage }, exifPosition]) => {
          this.setState({
            uploadInfo,
            position,
            positionErrorMessage,
            exifPosition
          })
        }
      )
      .catch(err => {
        this.setState({ finished: 'error' })
        throw err
      })
  }

  prepareUpload() {
    const query = queryString.stringify({ content_type: this.file.type })
    return fetch(`${SIGNS_UPLOAD_URL}?${query}`).then(response => {
      if (response.status === 200) return response.json()
      throw new Error('signs upload call failed: ' + response.status)
    })
  }

  geolocate() {
    const TIMEOUT = 10 * 1000

    return new Promise(function(resolve, reject) {
      if (!('geolocation' in navigator)) {
        resolve(null)
        return
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: TIMEOUT
      })
    })
      .then(position => {
        if (position) {
          return { position, positionErrorMessage: null }
        } else {
          return {
            position: null,
            positionErrorMessage: GEOLOCATION_NOT_SUPPORTED
          }
        }
      })
      .catch(err => {
        if (err.code && err.code >= 1 && err.code <= 3) {
          return {
            position: null,
            positionErrorMessage: GEOLOCATION_ERRORS[err.code]
          }
        } else {
          throw err
        }
      })
  }

  extractLocationFromFile() {
    function convertExifGpsToDegrees(value, reference) {
      // This is based on ExifTool's ToDegrees function.
      if (!value || !value.length || !reference) return null
      const [d, m, s] = value
      let degrees = d + ((m || 0) + (s || 0) / 60) / 60
      if (/(S|W)$/i.test(reference)) degrees = -degrees
      return degrees
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function handleFileReaderOnload(readerEvent) {
        try {
          const tags = ExifReader.load(readerEvent.target.result)
          resolve(tags)
        } catch (error) {
          if (
            error.name === 'MetadataMissingError' ||
            /Invalid image format/.test(error.message) // non-JPEG
          ) {
            resolve(null)
          } else {
            reject(error)
          }
        }
      }
      reader.readAsArrayBuffer(this.file)
    })
      .then(tags => {
        if (!tags) return null
        if (!tags.GPSLatitude || !tags.GPSLatitudeRef) return null
        if (!tags.GPSLongitude || !tags.GPSLongitudeRef) return null
        const latitude = convertExifGpsToDegrees(
          tags.GPSLatitude.value,
          tags.GPSLatitudeRef.value
        )
        const longitude = convertExifGpsToDegrees(
          tags.GPSLongitude.value,
          tags.GPSLongitudeRef.value
        )
        if (!latitude || !longitude) return null
        return { latitude, longitude }
      })
      .catch(error => {
        // For the moment, we only use this information to improve the
        // messaging, so just log the error.
        if (Rollbar) {
          Rollbar.error('Failed to extract location from file', error)
        }
        return null
      })
  }

  uploadFile() {
    return fetch(this.state.uploadInfo.url, {
      mode: 'cors',
      method: 'PUT',
      body: this.file
    }).then(() => {
      const { latitude, longitude } = this.state.position
        ? this.state.position.coords
        : {}

      const requestBody = {
        file_name: this.state.uploadInfo.fileName,
        title: this.state.title,
        latitude: latitude,
        longitude: longitude
      }

      return fetch(SIGNS_SUBMIT_URL, {
        mode: 'cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }).then(response => {
        if (response.status === 201) return
        if (response.status === 422) {
          return response.json().then(responseBody => {
            if (responseBody.message === BAD_TITLE_MESSAGE) {
              throw new Error(BAD_TITLE_MESSAGE)
            } else {
              throw new Error(
                'signs submit call failed validation: ' + responseBody.message
              )
            }
          })
        } else throw new Error('signs submit call failed: ' + response.status)
      })
    })
  }

  track(action) {
    ReactGA.event({
      category: 'Signs',
      action
    })
  }
}

export default Signs
