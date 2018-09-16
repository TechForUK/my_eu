import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProjectStore from '../project_store'
import AddYourStory from './add_your_story'
import PeoplesVote from './peoples_vote'
import SearchAgain from './search_again'
import {
  extractPostcodeArea,
  indefinitePluralise,
  getPrepositionAreaName
} from '../utilities'

import CordisInfo from './info_windows/cordis_info'
import CreativeInfo from './info_windows/creative_info'
import EsifInfo from './info_windows/esif_info'
import FtsInfo from './info_windows/fts_info'
import ErasmusInfo from './info_windows/erasmus_info'
import NhsInfo from './info_windows/nhs_info'

const projectStore = new ProjectStore()

function makeProjectInfo(data) {
  if (data.dataset === 'esif') {
    return <EsifInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'cordis') {
    return <CordisInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'creative') {
    return <CreativeInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'fts') {
    return <FtsInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'erasmus') {
    return <ErasmusInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'nhs') {
    return <NhsInfo key={data.organisation + '_' + data.name} {...data} />
  } else {
    return <div>TODO</div>
  }
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
          {indefinitePluralise(projects.length, 'Project')} at{' '}
          {this.getPostcode()}
        </h2>
      )

      return (
        <div id="my-eu-info">
          {this.renderLinks()}
          {header}
          {projects.map(makeProjectInfo)}
          <AddYourStory />
          <PeoplesVote />
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
            <i className="fa fa-level-up" />
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
