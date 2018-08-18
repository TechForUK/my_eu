import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundEuros } from './utilities'

const FtsInfo = ({ feature }) => {
  let budgetLine = feature.getProperty('budget_line_name_and_number')
  const benificiary = feature.getProperty('beneficiary')
  const amount = feature.getProperty('amount')
  const year = feature.getProperty('year')

  const displayEuGrant = formatRoundEuros(amount)

  let lead

  lead = (
    <p className="lead">
      In {year}, the EU provided {benificiary} {displayEuGrant} as part of the{' '}
      {budgetLine} programme.
    </p>
  )

  return (
    <div className="my-eu-info-window">
      <h2>{benificiary}</h2>
      {lead}
      <p>
        This grant was from the EU budget centrally administered by the
        Commission{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

FtsInfo.propTypes = {
  feature: PropTypes.object
}

export default FtsInfo
