import React from 'react'

import SearchBox from './search_box'
import Share from './share'

const AppHome = () => {
  return (
    <React.Fragment>
      <h1>What has the EU done for your area?</h1>
      <SearchBox />
      <Share
        message="See what the EU has funded in your area"
        url="https://www.myeu.uk"
      />
    </React.Fragment>
  )
}
export default AppHome
