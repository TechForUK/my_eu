import React from 'react'
import ReactGA from 'react-ga'

import finalSayPath from '../images/final_say.png'

const FinalSayAd = () => {
  const trackShare = action => {
    return () =>
      ReactGA.event({
        category: 'Share',
        action: action,
        url: document.location.href
      })
  }

  return (
    <div
      className="card bg-light my-eu-sidebar-ad mx-auto"
      style={{ maxWidth: '20em' }}
    >
      <div className="card-body">
        <p className="card-text lead">
          The best thing you can do is tell your MP what you think about Brexit.
        </p>
        <p>
          Write them a{' '}
          <a
            href="https://www.parliament.uk/get-involved/contact-your-mp/#jump-link-2"
            onClick={trackShare('Final Say - Letter')}
            target="_blank"
            rel="noopener noreferrer"
          >
            letter
          </a>
          , visit their{' '}
          <a
            href="https://www.parliament.uk/site-information/glossary/surgeries/"
            onClick={trackShare('FinalSay - Surgery')}
            target="_blank"
            rel="noopener noreferrer"
          >
            surgery
          </a>
          , send them an{' '}
          <a
            href="/tell-your-mp/"
            onClick={trackShare('FinalSay - Email')}
            target="_blank"
            rel="noopener noreferrer"
          >
            email
          </a>
          , or send them a{' '}
          <a
            href="https://finalsay.app"
            onClick={trackShare('FinalSay')}
            target="_blank"
            rel="noopener noreferrer"
          >
            voice message with FinalSay
          </a>
          .
        </p>
        <p className="card-text">
          <a
            href="https://finalsay.app"
            onClick={trackShare('FinalSay')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={{ height: '2em' }}
              src={finalSayPath}
              alt="FinalSay.app"
            />
          </a>
        </p>
      </div>
    </div>
  )
}

export default FinalSayAd
