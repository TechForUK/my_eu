import React from 'react'
import PropTypes from 'prop-types'

import PostcodeAreaStore from '../../postcode_area_store'
import SearchAgain from '../search_again'

import CapInfo from './cap_info'
import CordisInfo from './cordis_info'
import Header from './header'

const postcodeAreaStore = new PostcodeAreaStore()

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
        <CordisInfo {...data} />
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
