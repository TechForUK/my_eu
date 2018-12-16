/* global alert, fetch */

import React from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import queryString from 'query-string'

const SIGNS_UPLOAD_URL =
  'https://europe-west1-my-eu-1532800860795.cloudfunctions.net/signs_upload'

const SIGNS_SUBMIT_URL =
  'https://europe-west1-my-eu-1532800860795.cloudfunctions.net/signs_submit'

class Capture extends React.Component {
  constructor(props) {
    super(props)
    this.fileRef = React.createRef()
    this.handleUpload = this.handleUpload.bind(this)
  }

  render() {
    // return <form ref={this.formRef} className="dropzone" />
    return (
      <React.Fragment>
        <p className="lead">Help us add more projects to the map!</p>
        <p>
          If you find a sign, plaque or sticker that mentions EU support for a
          project, you can take a picture of it using your smartphone or tablet,
          and we&apos;ll get it onto the map.
        </p>
        <form className="text-center pt-3">
          <label
            htmlFor="my-eu-signs-upload-file"
            className="my-eu-signs-upload"
          >
            <i className="fas fa-camera" />
            <input
              ref={this.fileRef}
              onChange={this.handleUpload}
              id="my-eu-signs-upload-file"
              name="file"
              type="file"
              accept="image/*"
              capture="environment"
            />
            <p>Take a Picture of a Sign</p>
          </label>
        </form>
      </React.Fragment>
    )
  }

  handleUpload() {
    this.props.onUpload(this.fileRef.current.files[0])
  }
}

Capture.propTypes = {
  onUpload: PropTypes.func
}

const Location = () => {
  return (
    <div className="mt-5 mb-5">
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
      positionInfo = (
        <div className="card mb-3">
          <div className="card-body bg-light">
            <i className="fas fa-exclamation-triangle text-warning" />
            &nbsp; We could not find your location. We may be able to extract it
            from the photo you uploaded, but if not we won&apos;t be able to
            approve your submission.{' '}
            <a href="#" onClick={this.handleRetryGeolocation}>
              Try to find my location again.
            </a>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        {positionInfo}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="my-eu-signs-name">Your Name (Optional)</label>
            <input
              ref={this.nameRef}
              type="text"
              className="form-control"
              id="my-eu-signs-name"
              aria-describedby="my-eu-signs-name-help"
            />
            <small className="form-text text-muted" id="my-eu-signs-name-help">
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

const FinishedMessage = ({ success }) => {
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
    message = (
      <p>
        Sorry, something went wrong with the upload. Please try again, and if
        this problem persists, contact us via the about page.
      </p>
    )
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
  success: PropTypes.bool
}

class Signs extends React.Component {
  constructor(props) {
    super(props)

    this.file = null
    this.state = {
      haveFile: false,
      uploadInfo: null,
      position: null,
      confirmed: false,
      finished: false
    }

    this.handleUpload = this.handleUpload.bind(this)
    this.handleRetryGeolocation = this.handleRetryGeolocation.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  render() {
    if (!this.state.haveFile) {
      return <Capture onUpload={this.handleUpload} />
    } else if (!this.state.uploadInfo) {
      return <Location />
    } else if (!this.state.confirmed) {
      return (
        <Confirmation
          position={this.state.position}
          onRetryGeolocation={this.handleRetryGeolocation}
          onConfirm={this.handleConfirm}
        />
      )
    } else if (!this.state.finished) {
      return <Uploading />
    } else {
      return <FinishedMessage success={this.state.finished === 'success'} />
    }
  }

  handleUpload(file) {
    this.file = file
    this.setState({ haveFile: true })
    this.prepareUploadAndGeolocate()
  }

  handleRetryGeolocation() {
    this.setState({ uploadInfo: null, position: null })
    this.prepareUploadAndGeolocate()
  }

  handleConfirm(name) {
    this.setState({ confirmed: true, name })
    this.uploadFile()
      .then(() => {
        this.setState({ finished: 'success' })
      })
      .catch(error => {
        this.setState({ finished: 'error' })
        throw error
      })
  }

  prepareUploadAndGeolocate() {
    return Promise.all([this.prepareUpload(), this.geolocate()]).then(
      ([uploadInfo, position]) => {
        this.setState({ uploadInfo, position })
      }
    )
  }

  prepareUpload() {
    const query = queryString.stringify({ content_type: this.file.type })
    return fetch(`${SIGNS_UPLOAD_URL}?${query}`)
      .then(response => {
        return response.json()
      })
      .catch(error => {
        throw error
      })
  }

  geolocate() {
    const TIMEOUT = 10 * 1000

    // TODO handle errors
    return new Promise(function(resolve, reject) {
      if (!('geolocation' in navigator)) {
        throw new Error('geolocation not supported')
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: TIMEOUT
      })
    })
  }

  uploadFile() {
    return fetch(this.state.uploadInfo.url, {
      mode: 'cors',
      method: 'PUT',
      body: this.file
    }).then(() => {
      return fetch(SIGNS_SUBMIT_URL, {
        mode: 'cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file_name: this.state.uploadInfo.fileName,
          name: this.state.name,
          latitude: this.state.position.coords.latitude,
          longitude: this.state.position.coords.longitude
        })
      })
    })
  }
}

export default Signs
