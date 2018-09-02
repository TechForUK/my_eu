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

  return (
    <li className="list-group-item">
      <p className="text-truncate">{project.project}</p>
      <p className="display-4">
        {formatRoundPounds(project.max_contribution_gbp)}
      </p>
      <p className="text-muted">{yearRange}</p>
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

const CreativeInfo = ({
  postcodeArea,
  name,
  creative,
  totalAmounts,
  counts
}) => {
  const creativeTotal = sum(
    totalAmounts.filter(row => row.funds === 'CE').map(row => row.total)
  )

  let creativeCount = counts.find(row => row.kind === 'creative')
  if (!creativeCount || !creativeCount.count) return null
  creativeCount = creativeCount.count

  let topN = creativeCount > TOP_N ? `Top ${TOP_N} ` : ''

  let moreProjects = null
  if (creativeCount > TOP_N) {
    moreProjects = (
      <p>
        Browse the map to find{' '}
        {indefinitePluralise(creativeCount - TOP_N, 'more project')} in {name}.
      </p>
    )
  }

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
        <p className="card-text lead">
          The EU has invested {formatRoundPounds(creativeTotal)} to support{' '}
          {indefinitePluralise(creativeCount, 'creative project', 4)} in {name}.
        </p>
        <p>
          <a className="btn btn-social fa fa-twitter" href="#" role="button" />
        </p>
        <div id={id} className="collapse">
          <h5>
            {topN}
            Creative Projects in {name}
          </h5>
          <ul className="list-group list-group-flush">
            {creative.slice(0, 3).map(project => (
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
  name: PropTypes.string,
  creative: PropTypes.array,
  totalAmounts: PropTypes.array,
  counts: PropTypes.array
}

export default CreativeInfo
