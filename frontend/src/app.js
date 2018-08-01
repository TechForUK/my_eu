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
              <h1>What has the EU done for you?</h1>
              <form className="form-inline">
                <div className="form-row align-items-center">
                  <div className="col-auto">
                    <label htmlFor="my-eu-post-code">
                      Enter your postcode:
                    </label>
                  </div>
                  <div className="col-auto">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="my-eu-post-code"
                        placeholder="e.g. SW1A 1AA"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-primary mb-2">
                          Submit
                        </button>
                      </div>
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

ReactDOM.render(<App />, document.getElementById('my-eu-app'))
