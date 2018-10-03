import React from 'react'
import PropTypes from 'prop-types'

import Share from '../share'
import {
  convertSplitRowsToRecords,
  formatRoundPercentage
} from '../../utilities'

import NHS_STAFF_SPLIT from '../../data/map/output/nhs_staff.json'

const NHS_STAFF = convertSplitRowsToRecords(
  NHS_STAFF_SPLIT.columns,
  NHS_STAFF_SPLIT.data
)

function findTrustData(organisation) {
  return NHS_STAFF.find(record => record.organisation === organisation)
}

const NhsInfo = ({ hospitalName, organisation }) => {
  const data = findTrustData(organisation)
  if (!data) return <span />

  const totalEuStaff = data.eu_doctors + data.eu_nurses + data.eu_other
  const totalStaff =
    totalEuStaff + data.non_eu_doctors + data.non_eu_nurses + data.non_eu_other
  const totalDoctors = data.eu_doctors + data.non_eu_doctors
  const percentDoctors = data.eu_doctors / totalDoctors
  const totalNurses = data.eu_nurses + data.non_eu_nurses
  const percentNurses = data.eu_nurses / totalNurses
  const totalOther = data.eu_other + data.non_eu_other
  const percentOther = data.eu_other / totalOther

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
    tweet = `${totalEuStaff} of ${totalStaff} staff at ${
      data.organisation_name
    } are from the EU.`
  }
  return (
    <React.Fragment>
      <h4>{hospitalName}</h4>
      <div className="container">
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
        {hospitalName} is part of the {data.organisation_name}. An NHS hospital
        ward typically contains 24 beds, and needs 29 nurses to keep it running
        smoothly. Many NHS nurses and doctors are from the EU.
      </p>
      <h5>NHS Staff from the EU in the {data.organisation_name}</h5>
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th />
              <th>% From EU</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Doctors</th>
              <td align="right">
                {formatRoundPercentage(percentDoctors)} ({data.eu_doctors} /{' '}
                {totalDoctors})
              </td>
            </tr>
            <tr>
              <th>Nurses and Health Visitors</th>
              <td align="right">
                {formatRoundPercentage(percentNurses)} ({data.eu_nurses} /{' '}
                {totalNurses})
              </td>
            </tr>
            <tr>
              <th>Other Staff</th>
              <td align="right">
                {formatRoundPercentage(percentOther)} ({data.eu_other} /{' '}
                {totalOther})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Share message={tweet} />
    </React.Fragment>
  )
}

NhsInfo.propTypes = {
  hospitalName: PropTypes.string,
  organisation: PropTypes.string
}

export default NhsInfo
