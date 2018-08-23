import React from 'react'
import PropTypes from 'prop-types'

const LoadingInfo = ({ postcode }) => {
  return (
    <div>
      Loading projects for {postcode}
      &hellip;
    </div>
  )
}

LoadingInfo.propTypes = {
  postcode: PropTypes.string
}

export default LoadingInfo
