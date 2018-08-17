import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundEuros } from './utilities'

const CreativeInfo = ({ feature }) => {
  let title = feature.getProperty('Project Title')
  const coordinator = feature.getProperty("Coordinator's name")
  const partner = feature.getProperty('Partner_name')
  const euGrant = feature.getProperty(
    "EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project's lifetime will not be reflected here.)"
  )
  const website = feature.getProperty('Partner_website')

  const displayEuGrant = formatRoundEuros(euGrant)

  let lead
  if (feature.getProperty('Partner_website')) {
    lead = (
      <p className="lead">
        {partner} was part of the {title} project, coordinated by {coordinator}.
        The EU provided {displayEuGrant} for this project as a whole. You can
        see more info about the project at their website here: {website}
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        {partner} was part of the {title} project, coordinated by {coordinator}.
        The EU provided {displayEuGrant} for this project as a whole.
      </p>
    )
  }

  return (
    <div className="my-eu-info-window">
      <h2>{partner}</h2>
      {lead}
      <p>
        This grant as part of Creative Europe, which is a €1.46 billion European
        Union programme for the cultural and creative sectors for the years
        2014-2020.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

CreativeInfo.propTypes = {
  feature: PropTypes.object
}

export default CreativeInfo
