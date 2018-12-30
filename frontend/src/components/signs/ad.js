/* global alert */

import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import signLogoPath from '../../images/inkscape/sign.svg'

class SignsAd extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      progress: 'loading'
    }
  }

  componentDidMount() {
    $('body').on('show.bs.modal', '#my-eu-signs-modal', () => {
      this.loadModal()
    })
    // setTimeout(() => $('#my-eu-signs-modal').modal('show'), 100)
  }

  render() {
    return (
      <div
        className="card bg-light my-eu-sidebar-ad mx-auto"
        style={{ maxWidth: '22em' }}
      >
        <div className="card-body">
          <h5 className="card-title">Something not on the map?</h5>
          <p className="card-text">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#my-eu-signs-modal"
            >
              <img src={signLogoPath} style={{ height: '3em' }} />
              &nbsp; Add a Project
            </button>
          </p>
          <p className="card-text">
            Take a picture of a sign about an EU project and get it on the map.
          </p>
        </div>
      </div>
    )
  }

  loadModal() {
    this.trackClick()

    const modalBody = document.getElementById('my-eu-signs-modal-body')
    ReactDOM.render(<p>Loading&hellip;</p>, modalBody)

    this.loadSignsBundle()
      .then(Signs => {
        ReactDOM.render(<Signs />, modalBody)
      })
      .catch(() => {
        alert('Sorry, could not load sign uploader. Please try again.')
      })
  }

  loadSignsBundle() {
    return import(/* webpackChunkName: "signs" */ '.').then(
      ({ default: Signs }) => Signs
    )
  }

  trackClick() {
    ReactGA.event({
      category: 'Ad',
      action: 'Signs - Add a Project'
    })
  }
}

export default SignsAd
