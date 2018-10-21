import React from 'react'
import PropTypes from 'prop-types'

import Share from '../share'
import {
  convertSplitRowsToRecords,
  definitePluraliseList,
  formatRoundPercentage,
  toSentence
} from '../../utilities'

import NHS_STAFF_SPLIT from '../../data/map/output/nhs_staff.json'

const NHS_STAFF = convertSplitRowsToRecords(
  NHS_STAFF_SPLIT.columns,
  NHS_STAFF_SPLIT.data
)

function findTrustData(organisation) {
  return NHS_STAFF.find(record => record.organisation === organisation)
}

const NhsInfo = ({ hospitalName, organisation, myEuId }) => {
  const data = findTrustData(organisation)
  if (!data) return <span />

  const id = `my-eu-postcode-info-${data.myEuId}-details`
  const anchor = '#' + id

  const knownEuStaff = data.eu_doctors + data.eu_nurses + data.eu_other
  const knownStaff =
    knownEuStaff + data.non_eu_doctors + data.non_eu_nurses + data.non_eu_other
  const knownDoctors = data.eu_doctors + data.non_eu_doctors
  const percentDoctors = data.eu_doctors / knownDoctors
  const knownNurses = data.eu_nurses + data.non_eu_nurses
  const percentNurses = data.eu_nurses / knownNurses
  const knownOther = data.eu_other + data.non_eu_other
  const percentOther = data.eu_other / knownOther

  const pluralUnknowns = definitePluraliseList(
    [data.unknown_doctors, data.unknown_nurses, data.unknown_other],
    ['doctor', 'nurse', 'other staff'],
    ['doctors', 'nurses', 'other staff']
  )
  let unknownsNote
  if (pluralUnknowns.length) {
    unknownsNote =
      `There are also ${toSentence(pluralUnknowns)} in this trust who have` +
      ` not reported their nationality, so these are likely to be` +
      ` underestimates.`
  }

  const bedsPerWard = 24
  const nursesPerWard = 29
  const bedsPerNurse = bedsPerWard / nursesPerWard

  const beds = Math.round(bedsPerNurse * data.eu_nurses)

  let tweet
  if (beds >= 10) {
    tweet = `${
      data.eu_nurses
    } NHS nurses from the EU staff ${beds} hospital beds in the ${
      data.organisation_name
    }.`
  } else {
    tweet = `${knownEuStaff} of ${knownStaff} staff at ${
      data.organisation_name
    } are from the EU.`
  }
  return (
    <React.Fragment>
      <h5>{hospitalName}</h5>
      <div className="my-eu-hospital-in-the text-muted">in the</div>
      <h4>{data.organisation_name}</h4>
      <div className="my-eu-hospital-icons container">
        <div className="row">
          <div className="col-6">
            <p className="display-4 my-eu-icon-number">
              <i className="fas fa-user-md" />
              &nbsp;
              {data.eu_nurses}
            </p>
          </div>
          <div className="col-6">
            <p className="display-4 my-eu-icon-number">
              <i className="fas fa-bed" />
              &nbsp;
              {beds}
            </p>
          </div>
        </div>
      </div>
      <p className="lead">{tweet}</p>
      <p>
        <button
          className="btn btn-link btn-block my-eu-details-toggle collapsed"
          data-toggle="collapse"
          data-target={anchor}
          aria-expanded="false"
          aria-controls={anchor}
        >
          Details
        </button>
      </p>
      <div id={id} className="collapse">
        <p>
          {hospitalName} is part of the {data.organisation_name}. An NHS
          hospital ward typically contains 24 beds and needs 29 nurses to keep
          it running smoothly.
        </p>
        <p>
          {formatRoundPercentage(percentNurses)} of the nurses in this trust are
          from the EU.
        </p>
        <h5>
          NHS Staff from the EU with known nationalities in the{' '}
          {data.organisation_name}
        </h5>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th />
                <th />
                <th style={{ textAlign: 'right' }}>EU</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Doctors</th>
                <td align="right">{formatRoundPercentage(percentDoctors)}</td>
                <td align="right">{data.eu_doctors.toLocaleString()}</td>
                <td align="right">{knownDoctors.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Nurses and Health Visitors</th>
                <td align="right">{formatRoundPercentage(percentNurses)}</td>
                <td align="right">{data.eu_nurses.toLocaleString()}</td>
                <td align="right">{knownNurses.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Other Staff</th>
                <td align="right">{formatRoundPercentage(percentOther)}</td>
                <td align="right">{data.eu_other.toLocaleString()}</td>
                <td align="right">{knownOther.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted">
          <small>These data are from June, 2018. {unknownsNote}</small>
        </p>
      </div>
      <Share message={tweet} />
    </React.Fragment>
  )
}

NhsInfo.propTypes = {
  hospitalName: PropTypes.string,
  organisation: PropTypes.string,
  myEuId: PropTypes.string
}

export default NhsInfo
