import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Share from '../share'
import {
  formatRoundPounds,
  formatSemiCompactPounds,
  getPrepositionAreaName,
  indefinitePluralise,
  sum
} from '../../utilities'

const TOP_N = 3

const CordisProject = ({ project }) => {
  const startYear = project.start_date.getFullYear()
  const endYear = project.end_date.getFullYear()
  const yearRange =
    endYear > startYear ? (
      <span>
        {startYear}
        &ndash;
        {endYear}
      </span>
    ) : (
      <span>{startYear}</span>
    )
  const postcodePath = `/postcode/${project.postcode.split(/\s/).join('/')}`

  return (
    <li className="list-group-item">
      <p className="text-truncate">
        {project.acronym}: {project.title}
      </p>
      <p className="display-4">{formatRoundPounds(project.contribution_gbp)}</p>
      <p className="text-muted">{yearRange}</p>
      <p className="text-muted">
        {project.name}, <Link to={postcodePath}>{project.postcode}</Link>
      </p>
    </li>
  )
}

CordisProject.propTypes = {
  project: PropTypes.object
}

const CordisInfo = ({ postcodeArea, cordis, totalAmounts, projects }) => {
  const cordisTotal = sum(
    totalAmounts
      .filter(row => row.funds === 'FP7' || row.funds === 'H2020')
      .map(row => row.total)
  )
  let cordisCount = projects.find(row => row.kind === 'cordis')
  if (!cordisCount || !cordisCount.count) return null
  cordisCount = cordisCount.count

  let topN = cordisCount > TOP_N ? `Top ${TOP_N} ` : ''

  let moreProjects = null
  if (cordisCount > TOP_N) {
    moreProjects = (
      <p>
        Browse the map to find{' '}
        {indefinitePluralise(cordisCount - TOP_N, 'more project')}{' '}
        {getPrepositionAreaName(postcodeArea)}.
      </p>
    )
  }

  const lead = `The EU has invested ${formatRoundPounds(
    cordisTotal
  )} to support ${indefinitePluralise(
    cordisCount,
    'research project',
    4
  )} ${getPrepositionAreaName(postcodeArea)}.`
  const title = 'EU Support for Research'
  const emailSubject = `${title} ${getPrepositionAreaName(postcodeArea)}`

  const id = `my-eu-postcode-area-info-${postcodeArea}-cordis`
  const anchor = '#' + id

  return (
    <div className="card mt-3">
      <h3 className="card-header">
        {formatSemiCompactPounds(cordisTotal)} for Research
      </h3>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text lead">{lead}</p>
        <Share message={lead} emailSubject={emailSubject} />
        <div id={id} className="collapse">
          <h5>
            {topN}
            Research Projects {getPrepositionAreaName(postcodeArea)}
          </h5>
          <ul className="list-group list-group-flush">
            {cordis.slice(0, TOP_N).map(project => (
              <CordisProject key={project.my_eu_id} project={project} />
            ))}
          </ul>
          {moreProjects}
        </div>
      </div>
      <div className="card-footer text-center">
        <button
          className="btn btn-link btn-block my-eu-details-toggle collapsed"
          data-toggle="collapse"
          data-target={anchor}
          aria-expanded="false"
          aria-controls={anchor}
        >
          Details
        </button>
      </div>
    </div>
  )
}

CordisInfo.propTypes = {
  postcodeArea: PropTypes.string,
  cordis: PropTypes.array,
  totalAmounts: PropTypes.array,
  projects: PropTypes.array
}

export default CordisInfo
