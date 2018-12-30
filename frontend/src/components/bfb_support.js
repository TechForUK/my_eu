import React from 'react'
import ReactGA from 'react-ga'

import bestForBritainLogoPath from '../images/best_for_britain_logo.png'
import techForUkLogoPath from '../images/tech_for_uk_logo.png'

const BfBSupport = () => {
  const trackClick = action => {
    return () => {
      ReactGA.event({
        category: 'Ad',
        action: action
      })
    }
  }

  return (
    <React.Fragment>
      myeu.uk is supported by{' '}
      <a
        href="https://techforuk.com/"
        onClick={trackClick('Tech for UK')}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img style={{ height: '1.5em' }} src={techForUkLogoPath} />
      </a>{' '}
      and{' '}
      <a
        href="https://www.bestforbritain.org/"
        onClick={trackClick('Best for Britain')}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img style={{ height: '1.3em' }} src={bestForBritainLogoPath} />
      </a>
    </React.Fragment>
  )
}

export default BfBSupport
