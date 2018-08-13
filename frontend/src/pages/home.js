import React from 'react'
import { Meta, Title } from 'react-head'

import App from './components/app'

const Home = () => (
  <React.Fragment>
    <Title>MyEU.UK</Title>
    <Meta property="og:type" content="article" />
    <Meta
      property="og:description"
      content="See what the EU has done in your area"
    />
    <App />
  </React.Fragment>
)

export default Home
