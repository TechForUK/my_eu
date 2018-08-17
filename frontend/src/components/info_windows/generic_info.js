import React from 'react'
import PropTypes from 'prop-types'

const GenericInfo = ({ feature }) => {
  const body = []
  feature.forEachProperty(function(value, property) {
    body.push(
      <tr>
        <th>{property}</th>
        <td>{value}</td>
      </tr>
    )
  })

  return (
    <table>
      <tbody>{body}</tbody>
    </table>
  )
}

GenericInfo.propTypes = {
  feature: PropTypes.object
}

export default GenericInfo
