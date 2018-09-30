import React from 'react'
import PropTypes from 'prop-types'

import DisplayAmount from '../info/display_amount'

import Share from '../share'

import { formatRoundPounds } from '../../utilities'

const FtsInfo = ({
  myEuId,
  beneficiary,
  amount,
  budgetLineNameAndNumber,
  year
}) => {
  const displayEuGrant = formatRoundPounds(amount)

  const tweet =
    `In ${year}, the EU provided ${beneficiary} ${displayEuGrant}` +
    ` as part of the ${budgetLineNameAndNumber} programme.`

  let lead

  lead = (
    <p className="lead">
      In {year}, the EU provided {beneficiary} {displayEuGrant} as part of the{' '}
      {budgetLineNameAndNumber} programme.
    </p>
  )

  return (
    <div className="my-eu-info-window">
      <h4>{beneficiary}</h4>
      <DisplayAmount amount={amount} />
      <p className="text-muted">{year}</p>
      {lead}
      <Share message={tweet} />
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
