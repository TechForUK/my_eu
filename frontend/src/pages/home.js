import React from 'react'
import { Meta, Title } from 'react-head'

const Home = () => (
  <React.Fragment>
    <Title>MyEU.UK</Title>
    <Meta property="og:type" content="article" />
    <Meta
      property="og:description"
      content="See what the EU has done in your area"
    />
    <div id="my-eu-app" />
  </React.Fragment>
)

export default Home
