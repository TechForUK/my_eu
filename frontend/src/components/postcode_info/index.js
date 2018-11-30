import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProjectStore from '../../project_store'

import {
  definitePluralise,
  extractPostcodeArea,
  getPrepositionAreaName,
  indefinitePluralise
} from '../../utilities'

import FinalSayAd from '../final_say_ad'
import BfbAd from '../bfb_ad'
import SearchAgain from '../search_again'

import CordisInfo from './cordis_info'
import CreativeInfo from './creative_info'
import EsifInfo from './esif_info'
import FtsInfo from './fts_info'
import ErasmusInfo from './erasmus_info'
import NhsInfo from './nhs_info'
import NweuropeInfo from './nweurope_info'

const projectStore = new ProjectStore()

const INFO_COMPONENT = {
  cordis: CordisInfo,
  creative: CreativeInfo,
  esif: EsifInfo,
  fts: FtsInfo,
  erasmus: ErasmusInfo,
  nhs: NhsInfo,
  nweurope: NweuropeInfo
}

const CordisInfoFooter = ({ extra }) => {
  return (
    <React.Fragment>
      <h4>Plus {definitePluralise(extra, 'More Research Project')}</h4>
      <p>
        Check out the{' '}
        <a
          href="https://cordis.europa.eu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Community Research and Development Information Service
        </a>{' '}
        (CORDIS) to find more research projects funded by the European Research
        Council.
      </p>
    </React.Fragment>
  )
}

CordisInfoFooter.propTypes = {
  extra: PropTypes.number
}

const CreativeInfoFooter = ({ extra }) => {
  return (
    <React.Fragment>
      <h4>Plus {definitePluralise(extra, 'More Creative Project')}</h4>
      <p>
        Check out{' '}
        <a
          href="http://www.creativeeuropeuk.eu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Europe UK
        </a>{' '}
        to find more creative and cultural projects supported by the EU.
      </p>
    </React.Fragment>
  )
}

CreativeInfoFooter.propTypes = {
  extra: PropTypes.number
}

const ErasmusInfoFooter = ({ extra }) => {
  return (
    <React.Fragment>
      <h4>Plus {definitePluralise(extra, 'More Erasmus Project')}</h4>
      <p>
        Check out{' '}
        <a
          href="http://ec.europa.eu/programmes/erasmus-plus/"
          target="_blank"
          rel="noopener noreferrer"
        >
          the Erasmus+ Programme
        </a>{' '}
        to find out more about how the EU supports young people.
      </p>
    </React.Fragment>
  )
}

ErasmusInfoFooter.propTypes = {
  extra: PropTypes.number
}

const EsifInfoFooter = ({ extra }) => {
  return (
    <React.Fragment>
      <h4>Plus {definitePluralise(extra, 'More Structural Project')}</h4>
      <p>
        Find out more about how the EU supports jobs and growth through the{' '}
        <a
          href="https://en.wikipedia.org/wiki/European_Regional_Development_Fund"
          target="_blank"
          rel="noopener noreferrer"
        >
          European Regional Development Fund
        </a>{' '}
        and the{' '}
        <a
          href="https://en.wikipedia.org/wiki/European_Social_Fund"
          target="_blank"
          rel="noopener noreferrer"
        >
          European Social Fund
        </a>
        .
      </p>
    </React.Fragment>
  )
}

EsifInfoFooter.propTypes = {
  extra: PropTypes.number
}

const FtsInfoFooter = ({ extra }) => {
  return (
    <React.Fragment>
      <h4>Plus {definitePluralise(extra, 'More European Commission Grant')}</h4>
      <p>
        Find out more about EU commision grants from the{' '}
        <a
          href="http://ec.europa.eu/budget/fts/index_en.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Financial Tranparency System
        </a>
        .
      </p>
    </React.Fragment>
  )
}

FtsInfoFooter.propTypes = {
  extra: PropTypes.number
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

// Set the order of the sections
const INFO = ['nhs', 'erasmus', 'esif', 'creative', 'cordis', 'fts', 'nweurope']

function countProjects(projects) {
  let count = 0
  for (let datasetName in projects) {
    if (!projects.hasOwnProperty(datasetName)) continue
    const dataset = projects[datasetName]
    count += dataset.data.length + (dataset.extra || 0)
  }
  return count
}

function makeProjectsInfo(projects) {
  const results = []
  for (let datasetName of INFO) {
    const dataset = projects[datasetName]
    if (!dataset) continue
    const Info = INFO_COMPONENT[datasetName]
    const InfoFooter = INFO_FOOTER[datasetName]
    for (let data of dataset.data) {
      results.push(
        <li key={data.myEuId} className="list-group-item">
          <Info {...data} />
        </li>
      )
    }
    if (dataset.extra) {
      results.push(
        <li key={`extra_${datasetName}`} className="list-group-item">
          <InfoFooter extra={dataset.extra} />
        </li>
      )
    }
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
      const header = (
        <h2>
          {indefinitePluralise(countProjects(projects), 'Story', 5, 'Stories')}{' '}
          at {this.getPostcode()}
        </h2>
      )

      return (
        <div className="my-eu-info my-eu-postcode-info">
          {this.renderLinks()}
          {header}
          <ul className="list-group list-group-flush">
            {makeProjectsInfo(projects)}
          </ul>
          <BfbAd />
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
