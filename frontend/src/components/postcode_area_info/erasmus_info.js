import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import SharedBetween from '../info/shared_between'

import Share from '../share'

import {
  formatRoundPounds,
  formatSemiCompactPounds,
  getPrepositionAreaName,
  indefinitePluralise
} from '../../utilities'

const TOP_N = 3

const ErasmusProject = ({ project }) => {
  const startYear = project.start_date.getFullYear()
  const yearRange = <span>{startYear}</span>
  const postcodePath = `/postcode/${project.postcode.split(/\s/).join('/')}`

  return (
    <li className="list-group-item">
      <p className="text-truncate">{project.project}</p>
      <p className="display-4">
        {formatRoundPounds(project.max_contribution_gbp)}
      </p>
      <p className="text-muted">
        Started {yearRange}
        <SharedBetween
          numCountries={project.num_countries}
          numOrganisations={project.num_organisations}
        />
      </p>
      <p className="text-muted">
        {project.organisation_name},{' '}
        <Link to={postcodePath}>{project.postcode}</Link>
      </p>
    </li>
  )
}

ErasmusProject.propTypes = {
  project: PropTypes.object
}

const ErasmusInfo = ({ postcodeArea, erasmus, totalAmounts, projects }) => {
  let erasmusProjects = projects.find(row => row.kind === 'erasmus')
  if (!erasmusProjects || !erasmusProjects.count) return null
  const erasmusCount = erasmusProjects.count
  const erasmusTotal = erasmusProjects.total

  let topN = erasmusCount > TOP_N ? `Top ${TOP_N} ` : ''

  let moreProjects = null
  if (erasmusCount > TOP_N) {
    moreProjects = (
      <p>
        Browse the map to find{' '}
        {indefinitePluralise(erasmusCount - TOP_N, 'more project')}{' '}
        {getPrepositionAreaName(postcodeArea)}.
      </p>
    )
  }

  const lead =
    `The EU has invested ${formatRoundPounds(erasmusTotal)} to support` +
    ` ${indefinitePluralise(
      erasmusCount,
      'education, training, youth and sport project',
      4
    )} with partners ${getPrepositionAreaName(postcodeArea)}.`
  const title = 'EU Support through Erasmus+'
  const emailSubject = `${title} ${getPrepositionAreaName(postcodeArea)}`

  const id = `my-eu-postcode-area-info-${postcodeArea}-erasmus`
  const anchor = '#' + id

  return (
    <div className="card mt-3">
      <h3 className="card-header">
        {formatSemiCompactPounds(erasmusTotal)} for Young People
      </h3>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text lead">{lead}</p>
        <Share message={lead} emailSubject={emailSubject} />
        <div id={id} className="collapse">
          <h5>
            {topN}
            Erasmus+ Projects {getPrepositionAreaName(postcodeArea)}
          </h5>
          <ul className="list-group list-group-flush">
            {erasmus.slice(0, TOP_N).map(project => (
              <ErasmusProject key={project.my_eu_id} project={project} />
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

ErasmusInfo.propTypes = {
  postcodeArea: PropTypes.string,
  erasmus: PropTypes.array,
  totalAmounts: PropTypes.array,
  projects: PropTypes.array
}

export default ErasmusInfo
