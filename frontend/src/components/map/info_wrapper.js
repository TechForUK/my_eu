import React from 'react'
import PropTypes from 'prop-types'

import ProjectStore from './project_store'
import CordisInfo from '../info_windows/cordis_info'
import EsifInfo from '../info_windows/esif_info'
import Fts2016Info from '../info_windows/fts_2016_info'

// TODO This may not be the right thing... may have to close and re-open the
// popup, because otherwise it doesn't size properly.

function makeProjectInfo(data) {
  if (data.dataset === 'esif') {
    return <EsifInfo {...data} />
  } else if (data.dataset === 'cordis') {
    return <CordisInfo {...data} />
  } else if (data.dataset === 'fts') {
    return <Fts2016Info key={data.myEuId} {...data} />
  } else {
    return <div>TODO</div>
  }
}

const projectStore = new ProjectStore()

class InfoWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      postcodeData: this.lookup()
    }
  }

  lookup() {
    return projectStore.lookup(this.props.outwardCode, this.props.inwardCode)
  }

  componentDidMount() {
    if (this.state.postcodeData) return
    projectStore.load(this.props.outwardCode).then(() => {
      this.setState({ postcodeData: this.lookup() })
    })
  }

  render() {
    const projects = this.state.postcodeData
    if (projects) {
      let header
      if (projects.length > 1) {
        header = (
          <h2>
            {projects.length} projects at {this.props.postcode}
          </h2>
        )
      }
      return (
        <div className="my-eu-info-window">
          {header}
          {projects.map(makeProjectInfo)}
        </div>
      )
    } else {
      return (
        <div>
          Loading projects for {this.props.postcode}
          &hellip;
        </div>
      )
    }
  }
}

InfoWrapper.propTypes = {
  outwardCode: PropTypes.string,
  inwardCode: PropTypes.string,
  postcode: PropTypes.string
}

export default InfoWrapper
