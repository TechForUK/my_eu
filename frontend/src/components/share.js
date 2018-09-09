import React from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

const DEFAULT_EMAIL_SUBJECT = 'See what the EU has funded in your area'

const Share = ({
  message,
  emailSubject = DEFAULT_EMAIL_SUBJECT,
  emailBody,
  url = document.location.href
}) => {
  if (!emailBody) emailBody = `${message}\n\n${url}`
  const encodedMessage = encodeURIComponent(message)
  const encodedUrl = encodeURIComponent(url)
  const encodedEmailSubject = encodeURIComponent(emailSubject)
  const encodedEmailBody = encodeURIComponent(emailBody)

  const trackShare = action => {
    return () => {
      ReactGA.event({
        category: 'Share',
        action: action,
        label: url
      })
    }
  }

  return (
    <p>
      Share:
      <br />
      <a
        className="btn btn-social fa fa-twitter"
        href={`https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}&via=myeuuk`}
        onClick={trackShare('Twitter')}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
      />
      <a
        className="btn btn-social fa fa-facebook"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        onClick={trackShare('Facebook')}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
      />
      <a
        className="btn btn-social fa fa-envelope"
        href={`mailto:?subject=${encodedEmailSubject}&body=${encodedEmailBody}`}
        onClick={trackShare('Email')}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
      />
      <a
        className="btn btn-contact"
        href="https://www.writetothem.com/?a=westminstermp"
        onClick={trackShare('Tell your MP')}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tell your MP
      </a>
    </p>
  )
}

Share.propTypes = {
  message: PropTypes.string,
  emailSubject: PropTypes.string,
  emailBody: PropTypes.string,
  url: PropTypes.string
}

export default Share
