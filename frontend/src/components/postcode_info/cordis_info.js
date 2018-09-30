import React from 'react'
import PropTypes from 'prop-types'

import Summary from './summary'

import DisplayAmount from '../info/display_amount'
import SourceBadge from '../info/source_badge'

import Share from '../share'

import {
  formatRoundPercentage,
  formatRoundPounds,
  formatYearRange
} from '../../utilities'

const CordisInfo = ({
  startDate,
  endDate,
  projectTitle,
  organisationName,
  objective,
  contribution,
  totalCost,
  acronym,
  briefTitle,
  teaser,
  article,
  projectUrl,
  organizationUrl,
  imagePath
}) => {
  const yearRange = formatYearRange(startDate, endDate)

  let lead
  if (contribution && totalCost && contribution <= totalCost) {
    const displayEcContribution = formatRoundPounds(contribution)
    const displayPercentage = formatRoundPercentage(contribution / totalCost)
    lead = (
      <p className="lead">
        The EU provided {organisationName} with {displayEcContribution} to fund{' '}
        {displayPercentage} of the &quot;
        {acronym}
        &quot; research project.
      </p>
    )
  } else if (contribution) {
    const displayEcContribution = formatRoundPounds(contribution)
    lead = (
      <p className="lead">
        The EU provided {organisationName} with {displayEcContribution} to fund
        the &quot;
        {acronym}
        &quot; research project.
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        The EU supported {organisationName} as part of the &quot;
        {acronym}
        &quot; research project.
      </p>
    )
  }
  const tweet = `The EU supported ${organisationName} as part of the ${acronym} research project.`

  return (
    <React.Fragment>
      <h4>
        {projectTitle} <SourceBadge source="cordis" />
      </h4>
      <DisplayAmount amount={contribution} />
      <p className="text-muted">{yearRange}</p>
      {lead}
      <Summary text={objective} />
      <Share message={tweet} />
    </React.Fragment>
  )
}

CordisInfo.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  projectTitle: PropTypes.string,
  organisationName: PropTypes.string,
  objective: PropTypes.string,
  contribution: PropTypes.number,
  totalCost: PropTypes.number,
  acronym: PropTypes.string,
  briefTitle: PropTypes.string,
  teaser: PropTypes.string,
  article: PropTypes.string,
  projectUrl: PropTypes.string,
  organizationUrl: PropTypes.string,
  imagePath: PropTypes.string
}

export default CordisInfo
