import React from 'react'
import { Meta, Title } from 'react-head'

import App from '../components/app'
import { SITE_DESCRIPTION } from '../strings'

const TITLE = 'myeu.uk – see what the EU has done for you'

const Home = () => (
  <React.Fragment>
    <Title>{TITLE}</Title>
    <Meta property="og:type" content="website" />
    <Meta property="og:description" content={SITE_DESCRIPTION} />
    <Meta name="description" content={SITE_DESCRIPTION} />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:site" content="@myeuuk" />
    <Meta name="twitter:title" content={TITLE} />
    <Meta name="twitter:description" content={SITE_DESCRIPTION} />
    <div id="my-eu-root">
      <App />
    </div>
  </React.Fragment>
)

export default Home
