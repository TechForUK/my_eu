import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPounds } from './utilities'

const FtsInfo = ({
  myEuId,
  beneficiary,
  amount,
  budgetLineNameAndNumber,
  year
}) => {
  const displayEuGrant = formatRoundPounds(amount)

  let lead

  lead = (
    <p className="lead">
      In {year}, the EU provided {beneficiary} {displayEuGrant} as part of the{' '}
      {budgetLineNameAndNumber} programme.
    </p>
  )

  return (
    <div>
      <h2>{beneficiary}</h2>
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
  myEuId: PropTypes.string,
  beneficiary: PropTypes.string,
  amount: PropTypes.number,
  budgetLineNameAndNumber: PropTypes.string,
  year: PropTypes.number
}

export default FtsInfo
