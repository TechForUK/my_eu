import React from 'react'
import { Meta, Title } from 'react-head'

import App from '../components/app'

const Home = () => (
  <React.Fragment>
    <Title>myeu.uk</Title>
    <Meta property="og:type" content="article" />
    <Meta
      property="og:description"
      content="See what the EU has done in your area"
    />
    <div id="my-eu-root">
      <App />
    </div>
  </React.Fragment>
)

export default Home
