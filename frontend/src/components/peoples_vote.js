import React from 'react'
import ReactGA from 'react-ga'

const PeoplesVote = () => {
  const trackShare = () => {
    ReactGA.event({
      category: 'Share',
      action: 'Best for Britain'
    })
  }

  return (
    <div className="my-eu-sidebar-cta">
      <h2>Want a People&apos;s Vote on Brexit?</h2>
      <p>
        <a
          className="btn btn-contact"
          href="https://www.bestforbritain.org/contact_your_mp"
          onClick={trackShare}
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact your MP
        </a>
      </p>
      <p className="text-muted">
        Working with{' '}
        <a
          href="https://www.bestforbritain.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Best for Britain
        </a>
        .
      </p>
    </div>
  )
}

export default PeoplesVote
