import React from 'react'

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
                <h1>What has the EU done for your area?</h1>
                <form id="my-eu-search-form">
                  <div className="form-group">
                    <label htmlFor="my-eu-search-box">
                      The EU invests around{' '}
                      <a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31">
                        £5 billion
                      </a>{' '}
                      a year in the UK. Search by your address or postcode to
                      see some of the investments near you:
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        id="my-eu-search-box"
                        placeholder="e.g. SW1A 1AA"
                      />
                      <div className="input-group-append">
                        <input
                          className="btn btn-outline-primary"
                          type="submit"
                          value="&#x1f50d;"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="respond-group">
                  Share:
                  <br />
                  <a
                    className="btn btn-social fa fa-twitter"
                    href="https://twitter.com/intent/tweet?text=See%20what%20the%20EU%20has%20funded%20in%20your%20area;url=https%3A%2F%2Fmyeu.uk"
                    role="button"
                  />
                  <a
                    className="btn btn-social fa fa-facebook"
                    href="https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=https%3A%2F%2Fmyeu.uk%2F&display=popup&ref=plugin&src=share_button"
                    role="button"
                  />
                  <a
                    className="btn btn-social fa fa-envelope"
                    href="mailto:?subject=What%20has%20the%20EU%20done%20for%20you&#63&amp;body=https%3A%2F%2Fmyeu.uk"
                    role="button"
                  />
                  <a
                    className="btn btn-contact"
                    href="https://www.bestforbritain.org/contact_your_mp"
                    role="button"
                  >
                    Contact your MP
                  </a>
                </div>
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
