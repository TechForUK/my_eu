import React from 'react'
import { Meta, Title } from 'react-head'

import BfbAd from '../components/bfb_ad'
import Nav from '../components/nav'

const TellYourMp = () => {
  // React does not like "allowtransparency".
  /* eslint "react/no-unknown-property": "off" */
  return (
    <React.Fragment>
      <Title>tell your mp - myeu.uk - see what the EU has done for you</Title>
      <Meta property="og:type" content="article" />
      <div className="my-eu-tell-your-mp-nav">
        <Nav path="/tell-your-mp/" />
      </div>
      <div className="container my-eu-tell-your-mp">
        <iframe
          id="dogooder"
          allowtransparency="true"
          style={{
            boxSizing: 'border-box',
            minWidth: 300,
            width: 550,
            maxWidth: '100%'
          }}
          src="https://best-for-britain.good.do/DemandYourVote/Contact_Your_MP/?embedded="
          scrolling="no"
          frameBorder="0"
        >
          <p>
            Your browser does not support iframes. Please visit{' '}
            <a href="https://best-for-britain.good.do/DemandYourVote/Contact_Your_MP/">
              https://best-for-britain.good.do/DemandYourVote/Contact_Your_MP/
            </a>
          </p>
        </iframe>
        <script
          type="text/javascript"
          src="//code.jquery.com/jquery-1.11.0.min.js"
        />
        <script
          type="text/javascript"
          src="//static.good.do/static/js/jquery.iframeResizer.7d04fe8f6f93.js"
        />
        <script type="text/javascript" src="//static.good.do/embed.js" />
        <BfbAd />
      </div>
    </React.Fragment>
  )
}

export default TellYourMp
