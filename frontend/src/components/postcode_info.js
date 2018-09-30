import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProjectStore from '../project_store'
import AddYourStory from './add_your_story'
import SearchAgain from './search_again'
import { extractPostcodeArea, getPrepositionAreaName } from '../utilities'

import CordisInfo from './info_windows/cordis_info'
import CreativeInfo from './info_windows/creative_info'
import EsifInfo from './info_windows/esif_info'
import FtsInfo from './info_windows/fts_info'
import ErasmusInfo from './info_windows/erasmus_info'
import NhsInfo from './info_windows/nhs_info'

const projectStore = new ProjectStore()

const INFO_COMPONENT = {
  cordis: CordisInfo,
  creative: CreativeInfo,
  esif: EsifInfo,
  fts: FtsInfo,
  erasmus: ErasmusInfo,
  nhs: NhsInfo
}

const CordisInfoFooter = () => {
  return (
    <p>
      The European Research Council funds research that saves lives and drives
      innovation in the UK and across the EU.{' '}
      <a href="/about" target="_blank">
        Find out more.
      </a>
    </p>
  )
}

const CreativeInfoFooter = () => {
  return (
    <p>
      This grant was part of Creative Europe, which is a €1.46 billion European
      Union programme for the cultural and creative sectors for the years
      2014-2020.{' '}
      <a href="/about" target="_blank">
        Find out more.
      </a>
    </p>
  )
}

const ErasmusInfoFooter = () => {
  return (
    <p>
      This grant as part of Erasmus+, which helps young people.{' '}
      <a href="/about" target="_blank">
        Find out more.
      </a>
    </p>
  )
}

const EsifInfoFooter = () => {
  return (
    <p>
      The EU supported this project through its European Structural and
      Investment Funds, which are the EU&apos;s main funding programmes for
      supporting growth and jobs in the UK and across the EU.{' '}
      <a href="/about" target="_blank">
        Find out more.
      </a>
    </p>
  )
}

const FtsInfoFooter = () => {
  return (
    <p>
      This grant was from the EU budget centrally administered by the Commission{' '}
      <a href="/about" target="_blank">
        Find out more.
      </a>
    </p>
  )
}

const NhsInfoFooter = () => {
  return null
}

const INFO_FOOTER = {
  cordis: CordisInfoFooter,
  creative: CreativeInfoFooter,
  erasmus: ErasmusInfoFooter,
  esif: EsifInfoFooter,
  fts: FtsInfoFooter,
  nhs: NhsInfoFooter
}

const INFO_TITLE = {
  cordis: 'Research Projects',
  creative: 'Cultural and Creative Projects',
  erasmus: 'Young People',
  esif: 'Growth and Jobs',
  fts: 'European Commission Grants',
  nhs: 'NHS Hospitals'
}

// Set the order of the sections
const INFO = ['nhs', 'erasmus', 'esif', 'creative', 'cordis', 'fts']

function makeProjectsInfo(projects) {
  const results = []
  for (let datasetName of INFO) {
    const dataset = projects[datasetName]
    if (!dataset) continue
    const Info = INFO_COMPONENT[datasetName]
    const InfoFooter = INFO_FOOTER[datasetName]
    results.push(
      <h3 key={'header_' + datasetName}>{INFO_TITLE[datasetName]}</h3>
    )
    for (let data of dataset.data) {
      results.push(
        <li key={data.myEuId} className="list-group-item">
          <Info {...data} />
        </li>
      )
    }
    results.push(<InfoFooter key={'footer_' + datasetName} />)
  }
  return results
}

class PostcodeInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { outwardCode: null }
  }

  render() {
    const projects = this.lookup()
    if (projects) {
      const header = <h2>{this.getPostcode()}</h2>

      return (
        <div id="my-eu-info">
          {this.renderLinks()}
          {header}
          <ul className="list-group list-group-flush">
            {makeProjectsInfo(projects)}
          </ul>
          <AddYourStory />
        </div>
      )
    } else {
      return <div>loading {this.getPostcode()}</div>
    }
  }

  renderLinks() {
    let postcodeAreaLink
    const postcodeArea = this.getPostcodeArea()
    if (postcodeArea) {
      const postcodeAreaPath = `/area/${postcodeArea}`
      postcodeAreaLink = (
        <li className="nav-item">
          <Link to={postcodeAreaPath} className="nav-link">
            <i className="fas fa-level-up-alt" />
            &nbsp; More Projects {getPrepositionAreaName(postcodeArea)}
          </Link>
        </li>
      )
    }
    return (
      <ul className="nav">
        <SearchAgain />
        {postcodeAreaLink}
      </ul>
    )
  }

  lookup() {
    const { outwardCode, inwardCode } = this.props.match.params
    const projects = projectStore.lookup(outwardCode, inwardCode)
    if (projects) return projects
    projectStore.load(outwardCode).then(() => {
      this.setState({ outwardCode: outwardCode })
    })
    return null
  }

  getPostcodeArea() {
    return extractPostcodeArea(this.props.match.params.outwardCode)
  }

  getPostcode() {
    const { outwardCode, inwardCode } = this.props.match.params
    return `${outwardCode} ${inwardCode}`
  }
}

PostcodeInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      outwardCode: PropTypes.string.isRequired,
      inwardCode: PropTypes.string.isRequired
    })
  })
}

export default PostcodeInfo
