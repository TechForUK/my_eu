import React from 'react'
import PropTypes from 'prop-types'
import { StaticRouter, Route, Switch } from 'react-router-dom'
import { Link, Meta } from 'react-head'

import Home from './home'
import About from './about'
import Legal from './legal'
import Mockups from './mockups'
import TellYourMp from './tell_your_mp'
import iconPath from '../images/logo.png'
import myEuPath from '../images/myeu.png'

const SITE_ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://www.myeu.uk'
    : 'http://localhost:8080'

const Page = ({ path, scripts, stylesheets }) => {
  const staticContext = {}
  return (
    <React.Fragment>
      <Meta charSet="utf-8" />
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <Meta property="og:url" content={SITE_ROOT + path} />
      <Meta property="og:image" content={SITE_ROOT + myEuPath} />
      <Meta property="twitter:image" content={SITE_ROOT + myEuPath} />
      {stylesheets.map(path => (
        <Link key={path} rel="stylesheet" type="text/css" href={path} />
      ))}
      <Link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/solid.css"
        integrity="sha384-VGP9aw4WtGH/uPAOseYxZ+Vz/vaTb1ehm1bwx92Fm8dTrE+3boLfF1SpAtB1z7HW"
        crossOrigin="anonymous"
      />
      <Link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/brands.css"
        integrity="sha384-rf1bqOAj3+pw6NqYrtaE1/4Se2NBwkIfeYbsFdtiR6TQz0acWiwJbv1IM/Nt/ite"
        crossOrigin="anonymous"
      />
      <Link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css"
        integrity="sha384-1rquJLNOM3ijoueaaeS5m+McXPJCGdr5HcA03/VHXxcp2kX2sUrQDmFc3jR5i/C7"
        crossOrigin="anonymous"
      />
      <Link rel="icon" type="image/png" href={iconPath} />
      <StaticRouter location={path} context={staticContext}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about/">
            <About />
          </Route>
          <Route path="/legal/">
            <Legal />
          </Route>
          <Route path="/mockups/">
            <Mockups />
          </Route>
          <Route path="/tell-your-mp/">
            <TellYourMp />
          </Route>
        </Switch>
      </StaticRouter>
      {scripts.map(path => (
        <script key={path} type="text/javascript" src={path} />
      ))}
    </React.Fragment>
  )
}

Page.propTypes = {
  path: PropTypes.string,
  scripts: PropTypes.arrayOf(PropTypes.string),
  stylesheets: PropTypes.arrayOf(PropTypes.string)
}

export default Page
