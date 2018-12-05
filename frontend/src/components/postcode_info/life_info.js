import React from 'react'
import PropTypes from 'prop-types'

import Summary from './summary'
import DisplayAmount from '../info/display_amount'

import Share from '../share'

import { 
  formatRoundPounds, 
  formatRoundPercentage
} from '../../utilities'

const LifeInfo = ({
  myEuId,
  year,
  project_title,
  coordinator,
  amount,
  euContribution,
  background,
  project_url,
  website
}) => {
  const displayEuGrant = formatRoundPounds(euContribution)
  const displayPercentage = formatRoundPercentage(euContribution / amount)

  const tweet =
    `Since ${year}, the EU provided ${coordinator} ${displayEuGrant}` +
    ` as part of the ${project_title} project under the LIFE programme.`

  let lead

  lead = (
    <p className="lead">
      Since {year}, the EU provided {coordinator} {displayEuGrant} to fund{' '}
        {displayPercentage} as part of the{' '}
        {project_title} project within the LIFE programme.
    </p>
  )

  let summaryComponent
  if (background) summaryComponent = <Summary text={background} />

  return (
    <React.Fragment>
      <h4>{coordinator}</h4>
      <DisplayAmount amount={euContribution} />
      <p className="text-muted">From {year}</p>
      {lead}
      {summaryComponent}
      <Share message={tweet} />
    </React.Fragment>
  )
}

LifeInfo.propTypes = {
  myEuId: PropTypes.string,
  year: PropTypes.number,
  project_title: PropTypes.string,
  coordinator: PropTypes.string,
  amount: PropTypes.number,
  euContribtuion: PropTypes.number,
  background: PropTypes.string,
  project_url: PropTypes.string,
  website: PropTypes.string
}

export default LifeInfo
