import React from 'react'
import ReactGA from 'react-ga'

import BfbSupport from './bfb_support'

const BfbAd = () => {
  const trackClick = action => {
    return () => {
      ReactGA.event({
        category: 'Ad',
        action: action
      })
    }
  }

  return (
    <div
      className="card bg-light my-eu-sidebar-ad mx-auto"
      style={{ maxWidth: '22em' }}
    >
      <div className="card-body">
        <h5 className="card-title">Europe Stands with Us</h5>
        <p className="card-text">
          <a
            href="https://www.bestforbritain.org/join?utm_source=myeu"
            onClick={trackClick('Join the Best for Britain Mailing List')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Best for Britain Mailing List
          </a>
        </p>
        <p className="card-text text-center text-muted">
          <BfbSupport />
        </p>
      </div>
    </div>
  )
}

export default BfbAd
