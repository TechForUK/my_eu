import React from 'react'
import ReactGA from 'react-ga'

import bestForBritainLogoPath from '../images/best_for_britain_logo.png'
import techForUkLogoPath from '../images/tech_for_uk_logo.png'

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
      style={{ maxWidth: '20em' }}
    >
      <div className="card-body">
        <h5 className="card-title">Demand a #FinalSay on Brexit</h5>
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
        <p className="card-text">
          Sponsored by{' '}
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

export default BfbAd
