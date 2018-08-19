import React from 'react'
import PropTypes from 'prop-types'
import { StaticRouter, Route, Switch } from 'react-router-dom'
import { Link, Meta } from 'react-head'

import Home from './home'
import About from './about'
import myEuPath from '../images/myeu.png'

const SITE_ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://www.myeu.uk'
    : 'http://localhost:8080'

const Page = ({ path, scripts, stylesheets }) => {
  const staticContext = {}
  return (
    <React.Fragment>
      <Meta charset="utf-8" />
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <Meta property="og:url" content={SITE_ROOT + path} />
      <Meta property="og:image" content={myEuPath} />
      {stylesheets.map(path => (
        <Link key={path} rel="stylesheet" type="text/css" href={path} />
      ))}
      <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <StaticRouter location={path} context={staticContext}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about/">
            <About />
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
