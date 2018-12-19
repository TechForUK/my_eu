import React from 'react'
import PropTypes from 'prop-types'

import SearchAgain from '../search_again'

const SignsInfo = ({ match }) => {
  const imageSrc = `https://www.myeu.uk/signs/${match.params.signId}`
  return (
    <div className="my-eu-info">
      <ul className="nav">
        <SearchAgain />
      </ul>
      <p>
        <img src={imageSrc} className="img-fluid w-100" />
      </p>
      <p className="text-muted">
        This image was contributed by the myeu.uk community.
      </p>
    </div>
  )
}

SignsInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      signId: PropTypes.string.isRequired
    })
  })
}

export default SignsInfo
