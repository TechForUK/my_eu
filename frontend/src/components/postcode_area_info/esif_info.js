import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Share from '../share'
import {
  formatRoundPounds,
  formatSemiCompactPounds,
  indefinitePluralise,
  getPrepositionAreaName,
  sum
} from '../../utilities'

const TOP_N = 3

const EsifProject = ({ project }) => {
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
      <p className="text-truncate">{project.project}</p>
      <p className="display-4">{formatRoundPounds(project.eu_investment)}</p>
      <p className="text-muted">{yearRange}</p>
      <p className="text-muted">
        {project.beneficiary}, <Link to={postcodePath}>{project.postcode}</Link>
      </p>
    </li>
  )
}

EsifProject.propTypes = {
  project: PropTypes.object
}

const EsifInfo = ({ postcodeArea, esif, totalAmounts, projects }) => {
  const esifTotal = sum(
    totalAmounts
      .filter(row => row.funds === 'ERDF' || row.funds === 'ESF')
      .map(row => row.total)
  )

  let esifCount = projects.find(row => row.kind === 'esif')
  if (!esifCount || !esifCount.count) return null
  esifCount = esifCount.count

  let topN = esifCount > TOP_N ? `Top ${TOP_N} ` : ''

  let moreProjects = null
  if (esifCount > TOP_N) {
    moreProjects = (
      <p>
        Browse the map to find{' '}
        {indefinitePluralise(esifCount - TOP_N, 'more project')}{' '}
        {getPrepositionAreaName(postcodeArea)}.
      </p>
    )
  }

  const lead =
    `The EU has invested ${formatRoundPounds(esifTotal)} to support` +
    ` ${indefinitePluralise(esifCount, 'project', 4)} to create jobs` +
    ` ${getPrepositionAreaName(postcodeArea)}.`
  const title = 'EU Support for Employment and the Economy'
  const emailSubject = `${title} ${getPrepositionAreaName(postcodeArea)}`

  const id = `my-eu-postcode-area-info-${postcodeArea}-esif`
  const anchor = '#' + id

  return (
    <div className="card mt-3">
      <h3 className="card-header">
        {formatSemiCompactPounds(esifTotal)} for Growth and Jobs
      </h3>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text lead">{lead}</p>
        <Share message={lead} emailSubject={emailSubject} />
        <div id={id} className="collapse">
          <h5>
            {topN}
            Growth Projects {getPrepositionAreaName(postcodeArea)}
          </h5>
          <ul className="list-group list-group-flush">
            {esif.slice(0, TOP_N).map(project => (
              <EsifProject key={project.my_eu_id} project={project} />
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

EsifInfo.propTypes = {
  postcodeArea: PropTypes.string,
  esif: PropTypes.array,
  totalAmounts: PropTypes.array,
  projects: PropTypes.array
}

export default EsifInfo
