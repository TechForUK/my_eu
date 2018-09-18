import $ from 'jquery'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppHome from './app_home'
import PostcodeAreaInfo from './postcode_area_info'
import PostcodeInfo from './postcode_info'
import Map from './map'
import Nav from './nav'
import PageviewTracker from './pageview_tracker'
import RedButton from './red_button'

const SEARCH_PATH = '/search'
const POSTCODE_PATH = '/postcode/:outwardCode/:inwardCode'
const POSTCODE_AREA_PATH = '/area/:postcodeArea'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.bottomRef = React.createRef()
    this.state = {
      isClient: false,
      infoOnBottom: false
    }
  }

  componentDidMount() {
    // Trick to avoid rehydration mismatch. The server always renders the home
    // page, but the user might be loading with a path in the anchor; rehydrate
    // with the home page first, then re-render with actual content. This
    // approach is from https://reactjs.org/docs/react-dom.html#hydrate .
    this.setState({ isClient: true })

    // Trick to render the info bar below the map on mobile.
    // The bottom row's visibility is controlled by a media query.
    const handleResize = () => {
      const infoOnBottom = $(this.bottomRef.current).is(':visible')
      if (this.state.infoOnBottom !== infoOnBottom)
        this.setState({ infoOnBottom })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
  }

  render() {
    const { isClient, infoOnBottom } = this.state

    const pageviewTracker = isClient && <PageviewTracker />
    const postcodeInfo = <Route path={POSTCODE_PATH} component={PostcodeInfo} />
    const areaInfo = (
      <Route path={POSTCODE_AREA_PATH} component={PostcodeAreaInfo} />
    )

    return (
      <React.Fragment>
        {pageviewTracker}
        <div className="row no-gutters" id="my-eu-app">
          <div className="col-md-5" id="my-eu-bar">
            <Nav path="/" />
            <div className="container my-eu-data flex flex-column h-100">
              <div className="row flex-shrink-0">
                <div className="col">
                  <Switch>
                    <Route exact={isClient} path="/" component={AppHome} />
                    <Route path={SEARCH_PATH} component={AppHome} />
                    {!infoOnBottom && postcodeInfo}
                    {!infoOnBottom && areaInfo}
                  </Switch>
                </div>
              </div>
              <div className="row flex-grow-1 flex-shrink-0 align-items-end">
                <RedButton />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <Switch>
              <Route exact path="/" component={Map} />
              <Route path={SEARCH_PATH} component={Map} />
              <Route path={POSTCODE_PATH} component={Map} />
              <Route path={POSTCODE_AREA_PATH} component={Map} />
            </Switch>
          </div>
        </div>
        <div ref={this.bottomRef} className="row no-gutters d-md-none">
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Switch>
                    {infoOnBottom && postcodeInfo}
                    {infoOnBottom && areaInfo}
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default App
