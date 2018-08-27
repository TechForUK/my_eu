import React from 'react'
import { Title } from 'react-head'

import Nav from '../components/nav'

// button.my-eu-collapse-toggle:after {
//   content: 'v';
// }
// .collapsed button.my-eu-collapse-toggle:after {
//   content: '>';
// }
//
// button.my-eu-details-toggle.collapsed:before {
//   content: 'Show ';
// }
// button.my-eu-details-toggle:before {
//   content: 'Hide ';
// }

const Mockups = () => (
  <React.Fragment>
    <Title>Mockups - MyEU.UK</Title>
    <Nav path="/mockups/" />
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>EU Investment in Perth</h2>
          <div className="card">
            <h3 className="card-header">£30M for Farmers</h3>
            <div className="card-body">
              <h4 className="card-title">Support for Farmers</h4>
              <p className="card-text lead">
                In 2017, the EU provided £29,991,718 in funding to 1,178 farmers
                in Perth.
              </p>
              <h4>About</h4>
              <p>
                The European Agricultural Gurantee Fund finances direct payments
                to farmers and regulations for agricultural markets. The
                European Agricultural Fund for Rural Development finances
                programmes to make farm, forest and agri-food businesses more
                competitive, protect the environment, support rural economies
                and improve quality of life in rural areas.{' '}
                <a href="/about" target="_blank">
                  Find out more.
                </a>
              </p>
              <h4
                className="collapsed"
                data-toggle="collapse"
                data-target="#my-eu-area-PH-cap-table"
                aria-expanded="false"
                aria-controls="my-eu-area-PH-cap-table"
              >
                Funding Details
                <button
                  type="button"
                  className="btn btn-link my-eu-collapse-toggle float-right"
                />
              </h4>
              <table
                className="table table-sm collapse"
                id="my-eu-area-PH-cap-table"
              >
                <tbody>
                  <tr>
                    <th>European Agricultural Guarantee Fund</th>
                    <td align="right">£15,585,541</td>
                  </tr>
                  <tr>
                    <th>European Agricultural Fund for Rural Development</th>
                    <td align="right">£14,406,177</td>
                  </tr>
                  <tr>
                    <th>Total Funding</th>
                    <td align="right">£29,991,718</td>
                  </tr>
                  <tr>
                    <th>Number of Farms</th>
                    <td align="right">1,178</td>
                  </tr>
                  <tr>
                    <th>Average Funding per Farm</th>
                    <td align="right">£25,460</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card mt-3">
            <h3 className="card-header">
              £30M for Farmers
              <a
                className="btn btn-social fa fa-twitter float-right"
                href="#"
                role="button"
              />
            </h3>
            <div className="card-body">
              <h4 className="card-title">EU Support for Farming</h4>
              <p className="card-text lead">
                In 2017, the EU invested £29,991,718 to support 1,178 farmers in
                Perth.
              </p>
              <div id="my-eu-area-PH-cap-details" className="collapse">
                <h4>EU Funding for Farmers 2014&ndash;2017</h4>
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <th>European Agricultural Guarantee Fund</th>
                      <td align="right">£15,585,541</td>
                    </tr>
                    <tr>
                      <th>European Agricultural Fund for Rural Development</th>
                      <td align="right">£14,406,177</td>
                    </tr>
                    <tr>
                      <th>Total Funding</th>
                      <td align="right">£29,991,718</td>
                    </tr>
                    <tr>
                      <th>Number of Farms</th>
                      <td align="right">1,178</td>
                    </tr>
                    <tr>
                      <th>Average Funding per Farm</th>
                      <td align="right">£25,460</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  The European Agricultural Gurantee Fund finances direct
                  payments to farmers and regulations for agricultural markets.
                  The European Agricultural Fund for Rural Development finances
                  programmes to make farm, forest and agri-food businesses more
                  competitive, protect the environment, support rural economies
                  and improve quality of life in rural areas.{' '}
                  <a href="/about" target="_blank">
                    Find out more.
                  </a>
                </p>
              </div>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-link btn-block my-eu-details-toggle collapsed"
                data-toggle="collapse"
                data-target="#my-eu-area-PH-cap-details"
                aria-expanded="false"
                aria-controls="my-eu-area-PH-cap-details"
              >
                Details
              </button>
            </div>
          </div>

          <div className="card mt-3">
            <h3 className="card-header">
              £300M for Research
              <a
                className="btn btn-social fa fa-twitter float-right"
                href="#"
                role="button"
              />
            </h3>
            <div className="card-body">
              <h4 className="card-title">EU Support for Research</h4>
              <p className="card-text lead">
                The EU has invested £29,991,718 to support 1,178 research
                projects in Perth.
              </p>
              <div id="my-eu-area-PH-cap-details" className="">
                <h4>Research Projects in Perth</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">X</li>
                  <li className="list-group-item">Y</li>
                  <li className="list-group-item">Z</li>
                </ul>
              </div>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-link btn-block my-eu-details-toggle collapsed"
                data-toggle="collapse"
                data-target="#my-eu-area-PH-cordis-details"
                aria-expanded="false"
                aria-controls="my-eu-area-PH-cordis-details"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
)

export default Mockups
