import React from 'react'
import PropTypes from 'prop-types'

import { formatRoundPounds } from '../../utilities'

const CapInfo = ({ feature }) => {
  const areaName = feature.getProperty('postcodeAreaName')
  const count = feature.getProperty('count')
  const total = feature.getProperty('total')
  const totalAgriculturalGuaranteeFund =
    feature.getProperty('directEAGF') + feature.getProperty('otherEAGF')
  const totalRuralDevelopment = feature.getProperty('ruralDevelopment')
  const displayCount = count.toLocaleString()
  const displayTotal = formatRoundPounds(total)
  const displayAverage = formatRoundPounds(
    feature.getProperty('total') / feature.getProperty('count')
  )
  return (
    <div className="my-eu-info-window">
      <h2>Funding for Farms in {areaName}</h2>
      <p className="lead">
        In 2015, the EU provided {displayTotal} in funding to {displayCount}{' '}
        farms in {areaName}.
      </p>
      <h3>Funding Breakdown</h3>
      <table className="table table-sm">
        <tbody>
          <tr>
            <th>European Agricultural Guarantee Fund</th>
            <td align="right">
              {formatRoundPounds(totalAgriculturalGuaranteeFund)}
            </td>
          </tr>
          <tr>
            <th>European Agricultural Fund for Rural Development</th>
            <td align="right">{formatRoundPounds(totalRuralDevelopment)}</td>
          </tr>
          <tr>
            <th>Total Funding</th>
            <td align="right">{displayTotal}</td>
          </tr>
          <tr>
            <th>Number of Farms</th>
            <td align="right">{displayCount}</td>
          </tr>
          <tr>
            <th>Average Funding per Farm</th>
            <td align="right">{displayAverage}</td>
          </tr>
        </tbody>
      </table>
      <p>
        The European Agricultural Gurantee Fund finances direct payments to
        farmers and regulations for agricultural markets. The European
        Agricultural Fund for Rural Development finances programmes to make
        farm, forest and agri-food businesses more competitive, protect the
        environment, support rural economies and improve quality of life in
        rural areas.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

CapInfo.propTypes = {
  feature: PropTypes.object
}

export default CapInfo
