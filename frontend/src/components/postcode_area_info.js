import React from 'react'
import PropTypes from 'prop-types'

import PostcodeAreaStore from '../postcode_area_store'
import SearchAgain from './search_again'
import { formatRoundPounds } from '../utilities'

const postcodeAreaStore = new PostcodeAreaStore()

class PostcodeAreaInfo extends React.Component {
  render() {
    const data = this.lookup()
    if (!data) return <div>Loading postcode data&hellip;</div>
    return <pre>{JSON.stringify(data)}</pre>

    // const areaName = data.postcodeAreaName
    // const count = data.count
    // const total = data.total
    // const totalAgriculturalGuaranteeFund = data.directEAGF + data.otherEAGF
    // const totalRuralDevelopment = data.ruralDevelopment
    // const displayCount = count.toLocaleString()
    // const displayTotal = formatRoundPounds(total)
    // const displayAverage = formatRoundPounds(total / count)
    // const tweet = `the EU provided ${displayTotal} in funding to ${displayCount} farms in ${areaName}. See more funded projects at @myeuuk`
    // const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    //   tweet
    // )}`
    // return (
    //   <div className="my-eu-info-window">
    //     <ul className="nav">
    //       <SearchAgain />
    //     </ul>
    //     <h2>Funding for Farms in {areaName}</h2>
    //     <p className="lead">
    //       In 2015, the EU provided {displayTotal} in funding to {displayCount}{' '}
    //       farms in {areaName}.
    //     </p>
    //     <h3>Funding Breakdown</h3>
    //     <table className="table table-sm">
    //       <tbody>
    //         <tr>
    //           <th>European Agricultural Guarantee Fund</th>
    //           <td align="right">
    //             {formatRoundPounds(totalAgriculturalGuaranteeFund)}
    //           </td>
    //         </tr>
    //         <tr>
    //           <th>European Agricultural Fund for Rural Development</th>
    //           <td align="right">{formatRoundPounds(totalRuralDevelopment)}</td>
    //         </tr>
    //         <tr>
    //           <th>Total Funding</th>
    //           <td align="right">{displayTotal}</td>
    //         </tr>
    //         <tr>
    //           <th>Number of Farms</th>
    //           <td align="right">{displayCount}</td>
    //         </tr>
    //         <tr>
    //           <th>Average Funding per Farm</th>
    //           <td align="right">{displayAverage}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //     <p>
    //       The European Agricultural Gurantee Fund finances direct payments to
    //       farmers and regulations for agricultural markets. The European
    //       Agricultural Fund for Rural Development finances programmes to make
    //       farm, forest and agri-food businesses more competitive, protect the
    //       environment, support rural economies and improve quality of life in
    //       rural areas.{' '}
    //       <a href="/about" target="_blank">
    //         Find out more.
    //       </a>
    //     </p>
    //     <p>
    //       <a className="twitter-share-button" href={twitterLink}>
    //         Tweet
    //       </a>
    //     </p>
    //   </div>
    // )
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
