import React from 'react'
import { Route } from 'react-router-dom'

import AppHome from './app_home'
import Info from './info'
import Nav from './nav'

const App = () => {
  return (
    <React.Fragment>
      <div className="row no-gutters" id="my-eu-app">
        <div className="col-md-5" id="my-eu-bar">
          <Nav path="/" />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Route exact path="/" component={AppHome} />
                <Route
                  path="/postcode/:outwardCode/:inwardCode"
                  component={Info}
                />
                <div id="my-eu-side-info-container">
                  <div id="my-eu-info" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div id="my-eu-map" />
        </div>
      </div>
      <div className="row no-gutters d-md-none" id="my-eu-bottom-info-row">
        <div className="col" id="my-eu-bottom-info-container" />
      </div>
    </React.Fragment>
  )
}
export default App
