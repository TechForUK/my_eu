import React from 'react'
import PropTypes from 'prop-types'

import Summary from './summary'

import DisplayAmount from '../info/display_amount'
import SharedBetween from '../info/shared_between'
import SourceBadge from '../info/source_badge'

import Share from '../share'

import { formatRoundPounds, formatYearRange } from '../../utilities'

const CreativeInfo = ({
  startDate,
  endDate,
  project,
  organisationName,
  maxContribution,
  organisationWebsite,
  numCountries,
  numOrganisations,
  coordinatorName,
  summary
}) => {
  const yearRange = formatYearRange(startDate, endDate)
  const displayEuGrant = formatRoundPounds(maxContribution)

  let website
  if (organisationWebsite) {
    website = (
      <p>
        You can find out more about the project{' '}
        <a href={organisationWebsite} target="_blank" rel="noopener noreferrer">
          from their website.
        </a>
      </p>
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
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        {organisationName} was part of the {project} project
        {coordinator}. The EU provided {displayEuGrant} for this project as a
        whole.
      </p>
    )
  }

  return (
    <React.Fragment>
      <h4>
        {project} <SourceBadge source="creative" />
      </h4>
      <DisplayAmount amount={maxContribution} />
      <p className="text-muted">
        {yearRange}
        <SharedBetween {...{ numCountries, numOrganisations }} />
      </p>
      {lead}
      <Summary text={summary} />
      {website}
      <Share message={tweet} />
    </React.Fragment>
  )
}

CreativeInfo.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  project: PropTypes.string,
  organisationName: PropTypes.string,
  maxContribution: PropTypes.number,
  numCountries: PropTypes.number,
  numOrganisations: PropTypes.number,
  organisationWebsite: PropTypes.string,
  coordinatorName: PropTypes.string,
  summary: PropTypes.string
}

export default CreativeInfo
