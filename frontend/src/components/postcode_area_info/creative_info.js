import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  formatRoundPounds,
  formatSemiCompactPounds,
  getPrepositionAreaName,
  indefinitePluralise
} from '../../utilities'

const TOP_N = 3

const CreativeProject = ({ project }) => {
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

  let numOrganisations
  if (project.num_organisations > 1) {
    if (project.num_countries > 1) {
      numOrganisations = (
        <span>
          , between {project.num_organisations} organisations in{' '}
          {project.num_countries} countries
        </span>
      )
    } else {
      numOrganisations = (
        <span>
          , between {project.num_organisations} organisations in the UK
        </span>
      )
    }
  }

  return (
    <li className="list-group-item">
      <p className="text-truncate">{project.project}</p>
      <p className="display-4">
        {formatRoundPounds(project.max_contribution_gbp)}
      </p>
      <p className="text-muted">
        {yearRange}
        {numOrganisations}
      </p>
      <p className="text-muted">
        {project.organisation_name},{' '}
        <Link to={postcodePath}>{project.postcode}</Link>
      </p>
    </li>
  )
}

CreativeProject.propTypes = {
  project: PropTypes.object
}

const CreativeInfo = ({ postcodeArea, creative, totalAmounts, projects }) => {
  let creativeProjects = projects.find(row => row.kind === 'creative')
  if (!creativeProjects || !creativeProjects.count) return null
  const creativeCount = creativeProjects.count
  const creativeTotal = creativeProjects.total

  let topN = creativeCount > TOP_N ? `Top ${TOP_N} ` : ''

  let moreProjects = null
  if (creativeCount > TOP_N) {
    moreProjects = (
      <p>
        Browse the map to find{' '}
        {indefinitePluralise(creativeCount - TOP_N, 'more project')}{' '}
        {getPrepositionAreaName(postcodeArea)}.
      </p>
    )
  }

  const lead =
    `The EU has invested ${formatRoundPounds(creativeTotal)} to support` +
    ` ${indefinitePluralise(
      creativeCount,
      'creative project',
      4
    )} ${getPrepositionAreaName(postcodeArea)}.`
  const tweet = encodeURIComponent(lead)
  const url = encodeURIComponent(document.location.href)

  const id = `my-eu-postcode-area-info-${postcodeArea}-creative`
  const anchor = '#' + id

  return (
    <div className="card mt-3">
      <h3 className="card-header">
        {formatSemiCompactPounds(creativeTotal)} for Culture
      </h3>
      <div className="card-body">
        <h4 className="card-title">
          EU Support for Culture, Creativity and the Arts
        </h4>
        <p className="card-text lead">{lead}</p>
        <p>
          <a
            className="btn btn-social fa fa-twitter"
            href={`https://twitter.com/intent/tweet?text=${tweet}&url=${url}`}
            role="button"
          />
        </p>
        <div id={id} className="collapse">
          <h5>
            {topN}
            Creative Projects {getPrepositionAreaName(postcodeArea)}
          </h5>
          <ul className="list-group list-group-flush">
            {creative.slice(0, TOP_N).map(project => (
              <CreativeProject key={project.my_eu_id} project={project} />
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

CreativeInfo.propTypes = {
  postcodeArea: PropTypes.string,
  creative: PropTypes.array,
  totalAmounts: PropTypes.array,
  projects: PropTypes.array
}

export default CreativeInfo
