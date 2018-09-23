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

  const totalStaff = data.all_staff_eu + data.all_staff_uk
  const totalDoctors = data.hchs_doctors_eu + data.hchs_doctors_uk
  const percentDoctors = data.hchs_doctors_eu / totalDoctors
  const totalNurses = data.nurses_visitors_eu + data.nurses_visitors_uk
  const percentNurses = data.nurses_visitors_eu / totalNurses
  const totalOther = data.other_eu + data.other_uk
  const percentOther = data.other_eu / totalOther

  const bedsPerWard = 24
  const nursesPerWard = 29
  const bedsPerNurse = bedsPerWard / nursesPerWard

  const beds = Math.round(bedsPerNurse * data.nurses_visitors_eu)

  let tweet
  if (beds >= 10) {
    tweet = `${
      data.nurses_visitors_eu
    } NHS nurses from the EU staff ${beds} hospital beds in the ${
      data.organisation_name
    }.`
  } else {
    tweet = `${data.all_staff_eu} of ${totalStaff} staff at ${
      data.organisation_name
    } are from the EU.`
  }
  return (
    <div className="my-eu-info-window">
      <h3>{hospitalName}</h3>
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
              <th>From EU</th>
              <th>Total</th>
              <th>% From EU</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Doctors</th>
              <td align="right">{data.hchs_doctors_eu}</td>
              <td align="right">{totalDoctors}</td>
              <td align="right">{formatRoundPercentage(percentDoctors)}</td>
            </tr>
            <tr>
              <th>Nurses and Health Visitors</th>
              <td align="right">{data.nurses_visitors_eu}</td>
              <td align="right">{totalNurses}</td>
              <td align="right">{formatRoundPercentage(percentNurses)}</td>
            </tr>
            <tr>
              <th>Other Staff</th>
              <td align="right">{data.other_eu}</td>
              <td align="right">{totalOther}</td>
              <td align="right">{formatRoundPercentage(percentOther)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Share message={tweet} />
    </div>
  )
}

NhsInfo.propTypes = {
  hospitalName: PropTypes.string,
  organisation: PropTypes.string
}

export default NhsInfo
