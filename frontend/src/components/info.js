import React from 'react'
import PropTypes from 'prop-types'

const Info = ({ match }) => {
  return (
    <div>
      INFO {match.params.outwardCode} {match.params.inwardCode}
    </div>
  )
}

Info.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      outwardCode: PropTypes.string.isRequired,
      inwardCode: PropTypes.string.isRequired
    })
  })
}

export default Info
