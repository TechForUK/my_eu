import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPounds } from '../../utilities'

const CreativeInfo = ({
  project,
  organisationName,
  maxContribution,
  organisationWebsite,
  coordinatorName
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

  let lead = (
    <p className="lead">
      {organisationName} was part of the {project} project, coordinated by{' '}
      {coordinatorName}. The EU provided {displayEuGrant} for this project as a
      whole.
      {website}
    </p>
  )

  return (
    <div className="my-eu-info-window">
      <h2>{organisationName}</h2>
      {lead}
      <p>
        This grant as part of Creative Europe, which is a €1.46 billion European
        Union programme for the cultural and creative sectors for the years
        2014-2020.{' '}
        <a href="/about" target="_blank">
          Find out more.
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
  coordinatorName: PropTypes.string
}

export default CreativeInfo
