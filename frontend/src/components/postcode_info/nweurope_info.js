import React from 'react'
import PropTypes from 'prop-types'

import DisplayAmount from '../info/display_amount'

import Share from '../share'

import { formatRoundPounds } from '../../utilities'

const NweuropeInfo = ({
  myEuId,
  beneficiary,
  project,
  startDate,
  endDate,
  funding,
  unionCofinancing
}) => {
  const displayEuGrant = formatRoundPounds(funding)

  const tweet =
    `Since 2014, the EU provided ${beneficiary} ${displayEuGrant}` +
    ` as part of the ${project} project in the NWEurope programme.`

  let lead

  lead = (
    <p className="lead">
      Since 2014, the EU provided {beneficiary} {displayEuGrant} as part of the{' '}
      {project} project in the NWEurope programme.
    </p>
  )

  return (
    <React.Fragment>
      <h4>{beneficiary}</h4>
      <DisplayAmount amount={funding} />
      <p className="text-muted">2015-2020</p>
      {lead}
      <Share message={tweet} />
    </React.Fragment>
  )
}

NweuropeInfo.propTypes = {
  myEuId: PropTypes.string,
  beneficiary: PropTypes.string,
  project: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  funding: PropTypes.number,
  unionCofinancing: PropTypes.number
}

export default NweuropeInfo
