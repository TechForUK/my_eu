import React from 'react'
import PropTypes from 'prop-types'

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
      <h3>{beneficiary}</h3>
      {lead}
      <p>
        This grant was from the EU budget centrally administered by the
        Commission{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
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
