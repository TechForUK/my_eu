import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPercentage, formatRoundEuros } from './utilities'

const CordisInfo = ({
  projectTitle,
  organisationName,
  objective,
  ecContribution,
  totalCost,
  acronym,
  briefTitle,
  teaser,
  article,
  projectUrl,
  organizationUrl,
  imageUrl
}) => {
  let lead
  if (ecContribution && totalCost && ecContribution <= totalCost) {
    const displayEcContribution = formatRoundEuros(ecContribution)
    const displayPercentage = formatRoundPercentage(ecContribution / totalCost)
    lead = (
      <p className="lead">
        The EU provided {organisationName} with {displayEcContribution} to fund{' '}
        {displayPercentage} of the &quot;
        {acronym}
        &quot; research project.
      </p>
    )
  } else if (ecContribution) {
    const displayEcContribution = formatRoundEuros(ecContribution)
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

  return (
    <div className="my-eu-info-window">
      <h3>{projectTitle}</h3>
      {lead}
      <h4>Objective</h4>
      <p>{objective}</p>
      <p>
        The European Research Council funds research that saves lives and drives
        innovation in the UK and across the EU.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

CordisInfo.propTypes = {
  projectTitle: PropTypes.string,
  organisationName: PropTypes.string,
  objective: PropTypes.string,
  ecContribution: PropTypes.number,
  totalCost: PropTypes.number,
  acronym: PropTypes.string,
  briefTitle: PropTypes.string,
  teaser: PropTypes.string,
  article: PropTypes.string,
  projectUrl: PropTypes.string,
  organizationUrl: PropTypes.string,
  imageUrl: PropTypes.string
}

export default CordisInfo
