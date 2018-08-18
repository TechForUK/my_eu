import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPercentage, formatRoundPounds } from './utilities'

const EsifInfo = ({
  organisationName,
  projectTitle,
  summary,
  funds,
  euInvestment,
  projectCost
}) => {
  const displayEuInvestment = formatRoundPounds(euInvestment)
  const displayPercentage = formatRoundPercentage(euInvestment / projectCost)
  const tweet = `The EU provided ${organisationName} with ${displayEuInvestment} to fund ${projectTitle}.`

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweet
  )}`

  let lead
  if (!projectCost || euInvestment >= projectCost) {
    // Note: Some are overfunded. (TODO: may not be true any more; to check)
    lead = (
      <p className="lead">
        The EU provided {organisationName} with {displayEuInvestment} to fund
        this project.
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        The EU provided {organisationName} with {displayEuInvestment} to fund{' '}
        {displayPercentage} of this project.
      </p>
    )
  }

  let summarySection
  if (summary)
    summarySection = (
      <React.Fragment>
        <h4>Summary</h4>
        <p>{summary}</p>
      </React.Fragment>
    )

  return (
    <div>
      <h3>{projectTitle}</h3>
      {lead}
      {summarySection}
      <p>
        The EU supported this project through its European Structural and
        Investment Funds, which are the EU&apos;s main funding programmes for
        supporting growth and jobs in the UK and across the EU.{' '}
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

EsifInfo.propTypes = {
  organisationName: PropTypes.string,
  projectTitle: PropTypes.string,
  summary: PropTypes.string,
  funds: PropTypes.string,
  euInvestment: PropTypes.number,
  projectCost: PropTypes.number
}

export default EsifInfo
