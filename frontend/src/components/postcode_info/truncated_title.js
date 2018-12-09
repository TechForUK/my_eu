import React from 'react'
import PropTypes from 'prop-types'

const MAX_WORDS = 20

const TruncatedTitle = ({ text, children }) => {
  const words = text.split(' ')
  if (words.length > MAX_WORDS) {
    text = words.slice(0, MAX_WORDS).join(' ') + '...'
  }
  return (
    <h4>
      {text} {children}
    </h4>
  )
}

TruncatedTitle.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string
}

export default TruncatedTitle
