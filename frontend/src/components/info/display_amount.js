import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPounds } from '../../utilities'

const MIN_AMOUNT = 1

const DisplayAmount = ({ amount }) => {
  if (amount > MIN_AMOUNT) {
    return <p className="display-4">{formatRoundPounds(amount)}</p>
  } else {
    return null
  }
}
export default DisplayAmount

DisplayAmount.propTypes = {
  amount: PropTypes.number
}
