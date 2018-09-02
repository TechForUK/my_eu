import React from 'react'
import { Title } from 'react-head'

import Nav from '../components/nav'

const Mockups = () => (
  <React.Fragment>
    <Title>Mockups - MyEU.UK</Title>
    <Nav path="/mockups/" />
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>EU Investment in Perth</h2>

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
                <h5>Farm Funding in Perth &mdash; 2014&ndash;2017</h5>
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
              <div id="my-eu-area-PH-cordis-details" className="collapsed">
                <h5>Research Projects in Perth</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p className="text-truncate">
                      RETHINK big: Roadmap for European Technologies in Hardware
                      and Networking for Big Data
                    </p>
                    <h5 className="display-4">£57,494</h5>
                    <p className="text-muted">Eurotech Limited, CB2 7BN</p>
                  </li>
                  <li className="list-group-item">
                    <p className="text-truncate">
                      Green Computing Node for European micro-servers
                    </p>
                    <h5 className="display-4">£77,514</h5>
                    <p className="text-muted">Arm Limited, CB2 9NJ</p>
                  </li>
                  <li className="list-group-item">
                    <p className="text-truncate">
                      Increasing Value and Flow in the Marine Biodiscovery
                      Pipeline
                    </p>
                    <h5 className="display-4">£113,026</h5>
                    <p className="text-muted">Biobridge Limited, CB2 2BX</p>
                  </li>
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
                More Projects
              </button>
            </div>
          </div>

          <div className="card mt-3">
            <h3 className="card-header">
              £3M for Culture
              <a
                className="btn btn-social fa fa-twitter float-right"
                href="#"
                role="button"
              />
            </h3>
            <div className="card-body">
              <h4 className="card-title">
                EU Support for Culture, Creativity and the Arts
              </h4>
              <p className="card-text lead">
                The EU has invested £2,923,118 to support 78 creative projects
                in Perth.
              </p>
              <div id="my-eu-area-PH-cordis-details" className="collapsed">
                <h5>Creative Projects in Perth</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p className="text-truncate">
                      RETHINK big: Roadmap for European Technologies in Hardware
                      and Networking for Big Data
                    </p>
                    <h5 className="display-4">£57,494</h5>
                    <p className="text-muted">Eurotech Limited, CB2 7BN</p>
                  </li>
                  <li className="list-group-item">
                    <p className="text-truncate">
                      Green Computing Node for European micro-servers
                    </p>
                    <h5 className="display-4">£77,514</h5>
                    <p className="text-muted">Arm Limited, CB2 9NJ</p>
                  </li>
                  <li className="list-group-item">
                    <p className="text-truncate">
                      Increasing Value and Flow in the Marine Biodiscovery
                      Pipeline
                    </p>
                    <h5 className="display-4">£113,026</h5>
                    <p className="text-muted">Biobridge Limited, CB2 2BX</p>
                  </li>
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
                More Projects
              </button>
            </div>
          </div>

          <div className="card mt-3">
            <h3 className="card-header">
              £6M for Growth and Jobs
              <a
                className="btn btn-social fa fa-twitter float-right"
                href="#"
                role="button"
              />
            </h3>
            <div className="card-body">
              <h4 className="card-title">
                EU Support for Employment and the Economy
              </h4>
              <p className="card-text lead">
                The EU has invested £5,923,118 to support 78 projects to create
                jobs in Perth.
              </p>
              <div id="my-eu-area-PH-cordis-details" className="collapsed">
                <h5>Creative Projects in Perth</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p className="text-truncate">
                      RETHINK big: Roadmap for European Technologies in Hardware
                      and Networking for Big Data
                    </p>
                    <h5 className="display-4">£57,494</h5>
                    <p className="text-muted">Eurotech Limited, CB2 7BN</p>
                  </li>
                  <li className="list-group-item">
                    <p className="text-truncate">
                      Green Computing Node for European micro-servers
                    </p>
                    <h5 className="display-4">£77,514</h5>
                    <p className="text-muted">Arm Limited, CB2 9NJ</p>
                  </li>
                  <li className="list-group-item">
                    <p className="text-truncate">
                      Increasing Value and Flow in the Marine Biodiscovery
                      Pipeline
                    </p>
                    <h5 className="display-4">£113,026</h5>
                    <p className="text-muted">Biobridge Limited, CB2 2BX</p>
                  </li>
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
                More Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
)

export default Mockups
