/* eslint camelcase:0 */
import React from 'react'
import PropTypes from 'prop-types'

import Summary from './summary'
import DisplayAmount from '../info/display_amount'

import Share from '../share'

import { formatRoundPounds, formatRoundPercentage } from '../../utilities'

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
    `Since ${year}, the EU's LIFE programme provided ${coordinator} with` +
    ` ${displayEuGrant} as part of the "${project_title}" project.`

  let lead

  lead = (
    <p className="lead">
      The EU&apos;s LIFE programme provided {coordinator} with {displayEuGrant}{' '}
      to fund {displayPercentage} of the <em>{project_title}</em> project.
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
      <p className="text-muted">
        LIFE Programme data are in beta. Assumed exchange rate 0.81£/€. Stay
        tuned for data updates soon.
      </p>
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
  euContribution: PropTypes.number,
  background: PropTypes.string,
  project_url: PropTypes.string,
  website: PropTypes.string
}

export default LifeInfo
