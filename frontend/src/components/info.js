import React from 'react'
import PropTypes from 'prop-types'

import ProjectStore from '../project_store'
import CordisInfo from './info_windows/cordis_info'
import CreativeInfo from './info_windows/creative_info'
import EsifInfo from './info_windows/esif_info'
import FtsInfo from './info_windows/fts_info'

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
  } else {
    return <div>TODO</div>
  }
}

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: this.lookup()
    }
  }

  lookup() {
    const { outwardCode, inwardCode } = this.props.match.params
    return projectStore.lookup(outwardCode, inwardCode)
  }

  componentDidMount() {
    if (this.state.projects) return
    const { outwardCode } = this.props.match.params
    projectStore.load(outwardCode).then(() => {
      this.setState({ projects: this.lookup() })
    })
  }

  getPostcode() {
    const { outwardCode, inwardCode } = this.props.match.params
    return `${outwardCode} ${inwardCode}`
  }

  render() {
    const projects = this.state.projects
    if (projects) {
      let header
      if (projects.length > 1) {
        header = (
          <h2>
            {projects.length} projects at {this.getPostcode()}
          </h2>
        )
      }

      return (
        <div id="my-eu-info">
          {header}
          {projects.map(makeProjectInfo)}
        </div>
      )
    } else {
      return <div>loading</div>
    }
  }
}

Info.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      outwardCode: PropTypes.string.isRequired,
      inwardCode: PropTypes.string.isRequired
    })
  })
}

export default Info
