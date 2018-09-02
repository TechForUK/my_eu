import React from 'react'
import PropTypes from 'prop-types'

import {
  formatRoundPounds,
  formatSemiCompactPounds,
  sum
} from '../../utilities'

const CapInfo = ({ postcodeArea, name, cap }) => {
  const maxCapYear = Math.max.apply(null, cap.map(row => row.year))
  const latestCap = cap.find(row => row.year === maxCapYear)
  const compactTotal = formatSemiCompactPounds(latestCap.total)
  const displayTotal = formatRoundPounds(latestCap.total)
  const displayCount = latestCap.count.toLocaleString()

  const allTimeTotal = sum(cap.map(row => row.total))
  const allTimeTotalEagf = sum(cap.map(row => row.eagf))
  const allTimeTotalEafrd = sum(cap.map(row => row.eafrd))

  const id = `my-eu-postcode-area-info-${postcodeArea}-cap`
  const anchor = '#' + id

  return (
    <div className="card mt-3">
      <h3 className="card-header">
        {compactTotal}
        /year for Farmers
      </h3>
      <div className="card-body">
        <h4 className="card-title">EU Support for Farming</h4>
        <p className="card-text lead">
          In {maxCapYear}, the EU invested {displayTotal} to support{' '}
          {displayCount} farmers in {name}.
        </p>
        <p>
          <a className="btn btn-social fa fa-twitter" href="#" role="button" />
        </p>
        <div id={id} className="collapse">
          <h5>Farm Funding in {name} 2014&ndash;2017</h5>
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th />
                  {cap.map(row => (
                    <th key={row.year}>{row.year}</th>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>European Agricultural Guarantee Fund</th>
                  {cap.map(row => (
                    <td key={row.year} align="right">
                      {formatRoundPounds(row.eagf)}
                    </td>
                  ))}
                  <td align="right">{formatRoundPounds(allTimeTotalEagf)}</td>
                </tr>
                <tr>
                  <th>European Agricultural Fund for Rural Development</th>
                  {cap.map(row => (
                    <td key={row.year} align="right">
                      {formatRoundPounds(row.eafrd)}
                    </td>
                  ))}
                  <td align="right">{formatRoundPounds(allTimeTotalEafrd)}</td>
                </tr>
                <tr>
                  <th>Total Funding</th>
                  {cap.map(row => (
                    <td key={row.year} align="right">
                      {formatRoundPounds(row.total)}
                    </td>
                  ))}
                  <td align="right">{formatRoundPounds(allTimeTotal)}</td>
                </tr>
                <tr>
                  <th>Number of Farms</th>
                  {cap.map(row => (
                    <td key={row.year} align="right">
                      {row.count.toLocaleString()}
                    </td>
                  ))}
                  <td align="right" />
                </tr>
                <tr>
                  <th>Average Funding per Farm</th>
                  {cap.map(row => (
                    <td key={row.year} align="right">
                      {row.count > 0
                        ? formatRoundPounds(row.total / row.count)
                        : ''}
                    </td>
                  ))}
                  <td align="right" />
                </tr>
              </tbody>
            </table>
          </div>
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

CapInfo.propTypes = {
  postcodeArea: PropTypes.string,
  name: PropTypes.string,
  cap: PropTypes.array
}

export default CapInfo
