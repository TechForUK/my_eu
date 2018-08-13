import React from 'react'
import PropTypes from 'prop-types'
import { StaticRouter, Route, Switch } from 'react-router-dom'
import { Link, Meta } from 'react-head'

import Home from './home'
import About from './about'

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
      {stylesheets.map(path => (
        <Link key={path} rel="stylesheet" type="text/css" href={path} />
      ))}
      <StaticRouter location={path} context={staticContext}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
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
