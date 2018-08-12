import React from 'react'
import ReactDOM from 'react-dom'

import Map from './map'
import Nav from './nav'

const App = () => {
  return (
    <div className="row no-gutters" id="my-eu-root">
      <div className="col-md-4" id="my-eu-bar">
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>What has the EU done for your area?</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="my-eu-search-box">
                    The EU invests around <a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31">£5 billion</a> a year in the UK. Search by your address or postcode to see some of the investments near you::
                  </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="my-eu-search-box"
                      placeholder="e.g. SW1A 1AA"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">&#x1f50d;</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <Map />
      </div>
    </div>
  )
}
export default App

const container = document.getElementById('my-eu-app')
if (container) ReactDOM.render(<App />, container)
