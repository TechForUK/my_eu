import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  formatRoundPounds,
  formatSemiCompactPounds,
  indefinitePluralise,
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

const EsifInfo = ({ postcodeArea, name, esif, totalAmounts, counts }) => {
  const esifTotal = sum(
    totalAmounts
      .filter(row => row.funds === 'ERDF' || row.funds === 'ESF')
      .map(row => row.total)
  )

  let esifCount = counts.find(row => row.kind === 'esif')
  if (!esifCount || !esifCount.count) return null
  esifCount = esifCount.count

  let topN = esifCount > TOP_N ? `Top ${TOP_N} ` : ''

  let moreProjects = null
  if (esifCount > TOP_N) {
    moreProjects = (
      <p>
        Browse the map to find{' '}
        {indefinitePluralise(esifCount - TOP_N, 'more project')} in {name}.
      </p>
    )
  }

  const id = `my-eu-postcode-area-info-${postcodeArea}-esif`
  const anchor = '#' + id

  return (
    <div className="card mt-3">
      <h3 className="card-header">
        {formatSemiCompactPounds(esifTotal)} for Growth and Jobs
      </h3>
      <div className="card-body">
        <h4 className="card-title">
          EU Support for Employment and the Economy
        </h4>
        <p className="card-text lead">
          The EU has invested {formatRoundPounds(esifTotal)} to support{' '}
          {indefinitePluralise(esifCount, 'project', 4)} to create jobs in{' '}
          {name}.
        </p>
        <p>
          <a className="btn btn-social fa fa-twitter" href="#" role="button" />
        </p>
        <div id={id} className="collapse">
          <h5>
            {topN}
            Growth Projects in {name}
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
  name: PropTypes.string,
  esif: PropTypes.array,
  totalAmounts: PropTypes.array,
  counts: PropTypes.array
}

export default EsifInfo
