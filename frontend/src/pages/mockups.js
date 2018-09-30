import React from 'react'
import { Title } from 'react-head'

import Nav from '../components/nav'
import Share from '../components/share'

// Research
// - start date, end date
// - acronym
// - title
// - objective
// - contribution
// - total cost and total EU contribution
// - num countries, num organisations
// - org name
// - org URL

// Creative
// - start date, end date
// - project (title)
// - summary
// - results_available + results_url (other links repeat summary)
// - max contribution (all orgs)
// - num countries, num organisations
// - org name
// - org website

// Erasmus
// - call year only (no start / end dates yet)
// - project (title)
// - summary
// - max contribution (all orgs)
// - num countries, num organisations
// - org name
// - org website

// ESIF
// - start date, end date
// - project (title)
// - summary
// - total cost and total EU contribution
// - org name

const Mockups = () => (
  <React.Fragment>
    <Title>Mockups - MyEU.UK</Title>
    <Nav path="/mockups/" />
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Wolverhampton WV16 6NN</h2>

          <h3>NHS Nurses and Doctors</h3>
          <div className="card mt-3">
            <h3 className="card-header">The Whittington Hospital</h3>
            <div className="card-body">
              <p className="card-text lead">
                Whittington Hospital NHS Trust relies on 169 NHS nurses from the
                EU to staff 140 hospital beds.
              </p>
              <p>
                The Whittington Hospital is part of the Whittington Hospital NHS
                Trust, which employs 915 nurses, 18% of whom are from the EU.
              </p>
              <Share url="/" message="TODO" />
              <div id="my-eu-postcode-x-nhs-details" className="collapse">
                <h5>
                  NHS Staff from the EU in the Whittington Hospital NHS Trust
                </h5>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th />
                        <th>From EU</th>
                        <th>Total</th>
                        <th>% From EU</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Doctors</th>
                        <td align="right">42</td>
                        <td align="right">454</td>
                        <td align="right">9%</td>
                      </tr>
                      <tr>
                        <th>Nurses and Health Visitors</th>
                        <td align="right">169</td>
                        <td align="right">915</td>
                        <td align="right">18%</td>
                      </tr>
                      <tr>
                        <th>Other Staff</th>
                        <td align="right">298</td>
                        <td align="right">2297</td>
                        <td align="right">13%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  An NHS hospital ward typically contains 24 beds, and needs 29
                  nurses to keep it running smoothly.{' '}
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
                data-target="#my-eu-postcode-x-nhs-details"
                aria-expanded="false"
                aria-controls="my-eu-postcode-x-nhs-details"
              >
                Details
              </button>
            </div>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h4>
                SWAFAX: Seaweed derived anti-inflammatory agents and
                antioxidants
              </h4>
              <p className="display-4">£299,002</p>
              <p className="text-muted">
                <span>2010–2013</span>
              </p>
              <p className="card-text lead">
                The EU supported Tobermory Fish Company Limited as part of the
                &ldquo;OPTITEMPTANK&rdquo; research project.
              </p>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                The proposed project is focused on supporting the 6,000 SMEs
                that work in the European aquaculture sector and over 50,000
                SMEs in our supply chain including; plant installation, tank
                manufacturers, filtration engineers and temperature control
                engineers. European aquaculture production has increased
                substantially over the last decades. However, overall production
                growth
                <span>
                  … <a href="#">Show More</a>
                </span>
              </p>
              <p className="text-muted">
                <small>
                  Funded by the European Research Council{' '}
                  <a href="/about" target="_blank">
                    (?)
                  </a>
                </small>
              </p>
            </li>
          </ul>

          <div className="card mt-3">
            <h3 className="card-header">Research Projects</h3>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h4 className="card-title">
                    Development of an Integrated System for Cost Effective
                    Temperature Control in Aquaculture Tanks
                  </h4>
                  <p className="card-text lead">
                    The EU supported Tobermory Fish Company Limited as part of
                    the &ldquo;OPTITEMPTANK&rdquo; research project.
                  </p>
                  <p style={{ whiteSpace: 'pre-wrap' }}>
                    The proposed project is focused on supporting the 6,000 SMEs
                    that work in the European aquaculture sector and over 50,000
                    SMEs in our supply chain including; plant installation, tank
                    manufacturers, filtration engineers and temperature control
                    engineers. European aquaculture production has increased
                    substantially over the last decades. However, overall
                    production growth
                    <span>
                      … <a href="#">Show More</a>
                    </span>
                  </p>
                </li>
                <li className="list-group-item">
                  <h4 className="card-title">
                    Development of new techniques in hatchery rearing, fishery
                    enhancement and aquaculture for Nephrops
                  </h4>
                  <p className="card-text lead">
                    The EU provided Kames Fish Farming Ltd with £209,374 to fund
                    8% of the &ldquo;NEPHROPS&rdquo; research project.
                  </p>
                  <p style={{ whiteSpace: 'pre-wrap' }}>
                    Fisheries landings of Nephrops novegicus (also known as
                    Dublin Bay Prawn, Norway Lobster and Langoustine, among
                    other names) are around 59,000 tons a year with a first sale
                    value of close to €200 million.The NEPHROPS project is
                    intended to bring together complementary information from
                    survey, experimental and laboratory work. This
                    <span>
                      … <a href="#">Show More</a>
                    </span>
                  </p>
                </li>
              </ul>
              <p>
                The European Research Council funds research that saves lives
                and drives innovation in the UK and across the EU.{' '}
                <a href="/about" target="_blank">
                  Find out more.
                </a>
              </p>
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
            <h3 className="card-header">Culture, Creativity and the Arts</h3>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h4 className="card-title">TRIX PIX LIMITED</h4>
                  <p className="card-text lead">
                    TRIX PIX LIMITED was part of the New Norway project. The EU
                    provided £64,975 for this project as a whole.
                  </p>
                  <p style={{ whiteSpace: 'pre-wrap' }}>
                    This creative documentary is a “Wild West” story set in the
                    raw beauty of the Finnish Lapland wilderness. With humour
                    and irony the film explores the conflict between Sami
                    reindeer herders, Norwegian adventure snowmobilers and
                    tourist development through the eyes of Ingá-Máret, a young
                    Sami woman.Ingá-Máret has to fight
                    <span>
                      … <a href="#">Show More</a>
                    </span>
                  </p>
                </li>
              </ul>
              <p>
                This grant as part of Creative Europe, which is a €1.46 billion
                European Union programme for the cultural and creative sectors
                for the years 2014-2020.{' '}
                <a href="/about" target="_blank">
                  Find out more.
                </a>
              </p>
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
              £300M for Research
              <a
                className="btn btn-social fab fa-twitter float-right"
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
                className="btn btn-social fab fa-twitter float-right"
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

          <hr />
          <h2>EU Investment in Perth</h2>

          <div className="card mt-3">
            <h3 className="card-header">
              £30M for Farmers
              <a
                className="btn btn-social fab fa-twitter float-right"
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
                className="btn btn-social fab fa-twitter float-right"
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
                className="btn btn-social fab fa-twitter float-right"
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
                className="btn btn-social fab fa-twitter float-right"
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
