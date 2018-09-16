import React from 'react'
import ReactGA from 'react-ga'
import buttonLogo from '../images/button.png'

const RedButton = () => {

  const trackClick = action => {
    return () => {
      ReactGA.event({
        category: 'Ad',
        action: action
      })
    }
  }

  return (
    <div className="col col-md-12 my-eu-button-ad bg-light">
      <div className="container">
        <div className="row clearfix button-title my-3">
          <div className="col-12"><h1>Brexit: We don&apos;t have to do it</h1></div>
        </div>
        <div className="row justify-content-center my-3">
          <div className="col-flex button">
            <a
              onClick={trackClick('Button')}
              href="https://www.bestforbritain.org/"
            ><img src={buttonLogo}/></a>
          </div>
        </div>
        <div className="row justify-content-center my-3">
          <h2>
              Demand a
              <a
                onClick={trackClick('FinalSay')}
                href="https://twitter.com/intent/tweet?text=%23FinalSay"
              > #FinalSay </a>
              on the Brexit deal.
          </h2>
        </div>
      </div>
    </div>
  )
}

export default RedButton
