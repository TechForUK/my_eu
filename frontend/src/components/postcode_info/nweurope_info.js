import React from 'react'
import PropTypes from 'prop-types'

import Summary from './summary'
import TruncatedTitle from './truncated_title'

import DisplayAmount from '../info/display_amount'
import SourceBadge from '../info/source_badge'

import Share from '../share'

import { formatRoundPounds, formatYearRange } from '../../utilities'

const NweuropeInfo = ({
  myEuId,
  beneficiary,
  project,
  projectSummary,
  startDate,
  endDate,
  contribution
}) => {
  const displayEuGrant = formatRoundPounds(contribution)
  const yearRange = formatYearRange(startDate, endDate)

  // Most have the form ACRONYM - Name.
  const acronymMatch = project.match(/^(.+?) - /)
  const acronym = acronymMatch ? acronymMatch[1] : project

  const tweet =
    `The EU provided ${beneficiary} ${displayEuGrant} as part of the` +
    ` ${acronym} project in the Interreg North West Europe programme.`

  return (
    <React.Fragment>
      <TruncatedTitle text={project}>
        <SourceBadge source="nweurope" />
      </TruncatedTitle>
      <DisplayAmount amount={contribution} />
      <p className="text-muted">{yearRange}</p>
      <p className="lead">{tweet}</p>
      <Summary text={projectSummary} />
      <Share message={tweet} />
    </React.Fragment>
  )
}

NweuropeInfo.propTypes = {
  myEuId: PropTypes.string,
  beneficiary: PropTypes.string,
  project: PropTypes.string,
  projectSummary: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  contribution: PropTypes.number
}

export default NweuropeInfo
