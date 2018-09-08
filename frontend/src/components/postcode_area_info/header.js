import React from 'react'
import PropTypes from 'prop-types'

import { getPrepositionAreaName } from '../../utilities'

const Header = ({ postcodeArea }) => {
  return (
    <React.Fragment>
      <h2>EU Investment {getPrepositionAreaName(postcodeArea)}</h2>
    </React.Fragment>
  )
}

Header.propTypes = {
  postcodeArea: PropTypes.string
}

export default Header
