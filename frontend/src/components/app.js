import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppHome from './app_home'
import Info from './info'
import Map from './map'
import Nav from './nav'

class App extends React.Component {
  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    // Trick to avoid rehydration mismatch. The server always renders the home
    // page, but the user might be loading with a path in the anchor; rehydrate
    // with the home page first, then re-render with actual content. This
    // approach is from https://reactjs.org/docs/react-dom.html#hydrate .
    const secondRender = Boolean(this.state && this.state.isClient)

    return (
      <React.Fragment>
        <div className="row no-gutters" id="my-eu-app">
          <div className="col-md-5" id="my-eu-bar">
            <Nav path="/" />
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Switch>
                    <Route exact={secondRender} path="/" component={AppHome} />
                    <Route
                      path="/postcode/:outwardCode/:inwardCode"
                      component={Info}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <Map />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default App
