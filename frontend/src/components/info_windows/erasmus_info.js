import React from 'react'
import PropTypes from 'prop-types'

import Share from '../share'
import Summary from './summary'
import { formatRoundPounds } from '../../utilities'

const ErasmusInfo = ({
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
    coordinator = <span>, coordinated by {coordinatorName}</span>
  }

  const tweet =
    `${organisationName} was part of the ${project} project.` +
    ` The EU provided ${displayEuGrant} for this project as a whole.`

  let lead
  if (coordinatorName === organisationName) {
    lead = (
      <p className="lead">
        {organisationName} was the coordinator of the {project} project. The EU
        provided {displayEuGrant} for this project as a whole.
        {website}
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        {organisationName} was part of the {project} project
        {coordinator}. The EU provided {displayEuGrant} for this project as a
        whole.
        {website}
      </p>
    )
  }

  return (
    <div className="my-eu-info-window">
      <h3>{organisationName}</h3>
      {lead}
      <h4>Summary</h4>
      <Summary text={summary} />
      <p>
        This grant as part of Erasmus+, which helps young people.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
      <Share message={tweet} />
    </div>
  )
}

ErasmusInfo.propTypes = {
  project: PropTypes.string,
  organisationName: PropTypes.string,
  maxContribution: PropTypes.number,
  organisationWebsite: PropTypes.string,
  coordinatorName: PropTypes.string,
  summary: PropTypes.string
}

export default ErasmusInfo
