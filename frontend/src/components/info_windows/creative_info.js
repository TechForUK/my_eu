import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPounds } from '../../utilities'

const CreativeInfo = ({
  project,
  organisationName,
  maxContribution,
  organisationWebsite,
  coordinatorName,
  summary
}) => {
  const displayEuGrant = formatRoundPounds(maxContribution)

  let website
  if (organisationWebsite) {
    website = (
      <span>
        &nbsp;
        <a href={organisationWebsite} target="_blank" rel="noopener noreferrer">
          You can find out more about the project from their website.
        </a>
      </span>
    )
  }

  let coordinator
  if (coordinatorName) {
    website = <span>, coordinated by {coordinatorName}</span>
  }
  const tweet = `${organisationName} was part of the ${project} project${coordinator}. The EU provided ${displayEuGrant} for this project as a
  whole. See more funded projects at @myeuuk `

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweet
  )}`

  let lead = (
    <p className="lead">
      {organisationName} was part of the {project} project
      {coordinator}. The EU provided {displayEuGrant} for this project as a
      whole.
      {website}
    </p>
  )

  return (
    <div className="my-eu-info-window">
      <h2>{organisationName}</h2>
      {lead}
      <h3>Summary</h3>
      <p>{summary}</p>
      <p>
        This grant as part of Creative Europe, which is a €1.46 billion European
        Union programme for the cultural and creative sectors for the years
        2014-2020.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
      <p>
        <a className="twitter-share-button" href={twitterLink}>
          Tweet
        </a>
      </p>
    </div>
  )
}

CreativeInfo.propTypes = {
  project: PropTypes.string,
  organisationName: PropTypes.string,
  maxContribution: PropTypes.number,
  organisationWebsite: PropTypes.string,
  coordinatorName: PropTypes.string,
  summary: PropTypes.string
}

export default CreativeInfo
