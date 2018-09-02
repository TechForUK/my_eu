import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ name, totalAmounts }) => {
  return (
    <React.Fragment>
      <h2>EU Investment in {name}</h2>
    </React.Fragment>
  )
}

Header.propTypes = {
  name: PropTypes.string,
  totalAmounts: PropTypes.array
}

export default Header
