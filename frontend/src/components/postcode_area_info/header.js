import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPounds } from '../../utilities'

function findLatestYearWithCapData(totalAmounts) {
  const capYears = totalAmounts
    .filter(row => row.funds === 'CAP')
    .map(row => row.year)
  return Math.max.apply(null, capYears)
}

const Header = ({ name, totalAmounts }) => {
  const latestCapYear = findLatestYearWithCapData(totalAmounts)
  const capYearTotals = totalAmounts
    .filter(row => row.year === latestCapYear)
    .map(row => row.total)
  let total = 0
  for (let yearTotal of capYearTotals) total += yearTotal
  const displayTotal = formatRoundPounds(total)

  return (
    <React.Fragment>
      <h2>EU Investment in {name}</h2>
      <p className="lead">
        In {latestCapYear}, the EU invested {displayTotal} in {name} to support
        farms, research, culture and the local economy.
      </p>
    </React.Fragment>
  )
}

Header.propTypes = {
  name: PropTypes.string,
  totalAmounts: PropTypes.array
}

export default Header
