import React from 'react'
import PropTypes from 'prop-types'

const SharedBetween = ({ numOrganisations, numCountries }) => {
  if (numOrganisations > 1) {
    if (numCountries > 1) {
      return (
        <span>
          , shared between {numOrganisations} organisations in {numCountries}{' '}
          countries
        </span>
      )
    } else {
      return (
        <span>, shared between {numOrganisations} organisations in the UK</span>
      )
    }
  } else {
    return null
  }
}

export default SharedBetween

SharedBetween.propTypes = {
  numCountries: PropTypes.number,
  numOrganisations: PropTypes.number
}
