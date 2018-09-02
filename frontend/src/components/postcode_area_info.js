import React from 'react'
import PropTypes from 'prop-types'

import PostcodeAreaStore from '../postcode_area_store'
import SearchAgain from './search_again'
import { formatRoundPounds, formatSemiCompactPounds } from '../utilities'

const postcodeAreaStore = new PostcodeAreaStore()

function sum(xs) {
  let total = 0
  for (let x of xs) total += x
  return total
}

function findLatestYearWithCapData(totalAmounts) {
  const capYears = totalAmounts
    .filter(row => row.funds === 'CAP')
    .map(row => row.year)
  return Math.max.apply(null, capYears)
}

const Header = ({ name, totalAmounts }) => {
  const latestCapYear = findLatestYearWithCapData(totalAmounts)
  const capYearTotals = totalAmounts
    .filter(row => row.year === latestCapYear)
    .map(row => row.total)
  let total = 0
  for (let yearTotal of capYearTotals) total += yearTotal
  const displayTotal = formatRoundPounds(total)

  return (
    <React.Fragment>
      <h2>EU Investment in {name}</h2>
      <p className="lead">
        In {latestCapYear}, the EU invested {displayTotal} in {name} to support
        farms, research, culture and the local economy.
      </p>
    </React.Fragment>
  )
}

Header.propTypes = {
  name: PropTypes.string,
  totalAmounts: PropTypes.array
}

const CapInfo = ({ name, cap }) => {
  const maxCapYear = Math.max.apply(null, cap.map(row => row.year))
  const latestCap = cap.find(row => row.year === maxCapYear)
  const compactTotal = formatSemiCompactPounds(latestCap.total)
  const displayTotal = formatRoundPounds(latestCap.total)
  const displayCount = latestCap.count.toLocaleString()

  const allTimeTotal = sum(cap.map(row => row.total))
  const allTimeTotalEagf = sum(cap.map(row => row.eagf))
  const allTimeTotalEafrd = sum(cap.map(row => row.eafrd))

  const id = `my-eu-postcode-area-info-${cap.postcodeArea}-cap`
  const anchor = '#' + id

  return (
    <div className="card mt-3">
      <h3 className="card-header">
        {compactTotal} for Farmers
        <a
          className="btn btn-social fa fa-twitter float-right"
          href="#"
          role="button"
        />
      </h3>
      <div className="card-body">
        <h4 className="card-title">EU Support for Farming</h4>
        <p className="card-text lead">
          In {maxCapYear}, the EU invested {displayTotal} to support{' '}
          {displayCount} farmers in {name}.
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
  name: PropTypes.string,
  cap: PropTypes.array
}

class PostcodeAreaInfo extends React.Component {
  render() {
    const data = this.lookup()
    if (!data) return <div>Loading postcode data&hellip;</div>
    return (
      <div className="my-eu-postcode-area-info">
        <ul className="nav">
          <SearchAgain />
        </ul>
        <Header {...data} />
        <CapInfo {...data} />
      </div>
    )
  }

  lookup() {
    const { postcodeArea } = this.props.match.params
    const data = postcodeAreaStore.lookup(postcodeArea)
    if (data) return data
    postcodeAreaStore.load().then(() => {
      this.setState({ loaded: true })
    })
    return null
  }
}

PostcodeAreaInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postcodeArea: PropTypes.string.isRequired
    })
  })
}

export default PostcodeAreaInfo
