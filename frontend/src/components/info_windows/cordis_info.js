import React from 'react'
import PropTypes from 'prop-types'

import Share from '../share'
import Summary from './summary'
import { formatRoundPercentage, formatRoundPounds } from '../../utilities'

const CordisInfo = ({
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
    <div className="my-eu-info-window">
      <h3>{projectTitle}</h3>
      {lead}
      <h4>Objective</h4>
      <Summary text={objective} />
      <p>
        The European Research Council funds research that saves lives and drives
        innovation in the UK and across the EU.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
      <Share message={tweet} />
    </div>
  )
}

CordisInfo.propTypes = {
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
