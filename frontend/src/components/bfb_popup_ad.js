import * as Cookies from 'js-cookie'
import React from 'react'
import ReactGA from 'react-ga'

import BfbSupport from './bfb_support'

const TIMEOUT = 20 * 1000 // ms to wait before showing popup
const COOKIE_NAME = 'bestforbritain-popup'
const COOKIE_EXPIRES = 14 // days

class BfbPopupAd extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shown: false
    }

    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    if (!this.userHasClosed()) {
      setTimeout(() => {
        ReactGA.event({
          category: 'Ad',
          action: 'Show Best for Britain Popup'
        })
        this.setState({ shown: true })
      }, TIMEOUT)
    }
  }

  render() {
    if (!this.state.shown) return null

    const trackClick = action => {
      return () => {
        ReactGA.event({
          category: 'Ad',
          action: action
        })
      }
    }

    return (
      <aside
        className="bestforbritain-popup container-fluid"
        role="complementary"
      >
        <h3 className="mt-3 text-center">
          Sign up to <strong>#FightBrexit</strong>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.handleClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </h3>
        <p>
          Sign up to join Best for Britain&apos;s campaign for a #FinalSayForAll
          and receive our email newsletter &mdash; packed full of campaign
          updates, local and national happenings, and event info &mdash; all you
          need to get involved in the grassroots Brexit Fightback.
        </p>
        <p>
          Join the campaign for a final say with the option to stay. People, not
          politicians, deserve to make the final decision on Brexit.
        </p>
        <p className="text-center">
          <a
            href="https://www.bestforbritain.org/join?utm_source=myeu"
            onClick={trackClick(
              'Join the Best for Britain Mailing List (Popup)'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Join the Best for Britain Mailing List
          </a>
        </p>
        <p className="text-center text-muted">
          <BfbSupport />
        </p>
      </aside>
    )
  }

  handleClose() {
    ReactGA.event({
      category: 'Ad',
      action: 'Close Best for Britain Popup'
    })

    this.setState({ shown: false })
    Cookies.set(COOKIE_NAME, true, { expires: COOKIE_EXPIRES })
  }

  userHasClosed() {
    return !!Cookies.get(COOKIE_NAME)
  }
}

export default BfbPopupAd
