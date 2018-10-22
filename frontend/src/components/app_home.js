import React from 'react'

import { SITE_EMAIL_BODY, SITE_URL } from '../strings'

import BfbAd from './bfb_ad'
import SearchBox from './search_box'
import Share from './share'

const AppHome = () => {
  return (
    <React.Fragment>
      <h1 className="mt-3">What has the EU done for your area?</h1>
      <SearchBox />
      <Share
        message="See what the EU has funded in your area"
        url={SITE_URL}
        emailBody={SITE_EMAIL_BODY}
      />
      <div id="my-eu-home-extra">
        <BfbAd />
      </div>
    </React.Fragment>
  )
}
export default AppHome
