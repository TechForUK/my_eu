import React from 'react'
import ReactGA from 'react-ga'
import { Route } from 'react-router-dom'

const PageviewTracker = () => {
  return (
    <Route
      path="/"
      render={({ location }) => {
        ReactGA.ga('set', 'page', location.pathname + location.search)
        ReactGA.ga('send', 'pageview')
        return null
      }}
    />
  )
}

export default PageviewTracker
