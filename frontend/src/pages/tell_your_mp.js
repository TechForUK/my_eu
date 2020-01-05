import React from 'react'
import { Meta, Title } from 'react-head'

import Nav from '../components/nav'

const TellYourMp = () => {
  return (
    <React.Fragment>
      <Title>tell your mp - myeu.uk - see what the EU has done for you</Title>
      <Meta property="og:type" content="article" />
      <div className="my-eu-tell-your-mp-nav">
        <Nav path="/tell-your-mp/" />
      </div>
      <div className="container my-eu-tell-your-mp">
        <h1>Let your MP know what you think</h1>
        <p>The best way to get your MP&apos;s attention <a href="https://www.parliament.uk/get-involved/contact-your-mp/">is to write them a good old fashioned letter</a>.</p>
      </div>
    </React.Fragment>
  )
}

export default TellYourMp
