import React from 'react'
import ReactGA from 'react-ga'

import bestForBritainLogoPath from '../images/best_for_britain_logo.png'
import techForUkLogoPath from '../images/tech_for_uk_logo.png'

const HackathonAd = () => {
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
      style={{ maxWidth: '20em' }}
    >
      <div className="card-body">
        <h5 className="card-title">Help build apps like this one!</h5>
        <p className="card-text">
          <a
            href="https://join.techforuk.com/"
            onClick={trackClick('Join the Great British Hack-Off')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Great British Hack-Off
          </a>
          <br />
          September 15&ndash;16, Central London
        </p>
        <p className="card-text">
          Organised by{' '}
          <a
            href="https://techforuk.com/"
            onClick={trackClick('Tech for UK')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={{ height: '1.7em' }} src={techForUkLogoPath} />
          </a>{' '}
          and{' '}
          <a
            href="https://www.bestforbritain.org/"
            onClick={trackClick('Best for Britain')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={{ height: '1.5em' }} src={bestForBritainLogoPath} />
          </a>
        </p>
      </div>
    </div>
  )
}

export default HackathonAd
