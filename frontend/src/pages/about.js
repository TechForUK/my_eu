import React from 'react'
import { Title } from 'react-head'
import logoPath from '../images/eusmall.png'

const About = () => (
  <React.Fragment>
    <Title>About - MyEU.UK</Title>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img
          src={logoPath}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="MyEU Logo"
        />
        &nbsp;MyEU.UK
      </a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Back to the Map
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/about/">
            About
          </a>
        </li>
      </ul>
    </nav>
    <div className="container">
      <h1>About MyEU</h1>
      <p>
        The UK Government will spend about{' '}
        <a href="https://www.gov.uk/government/publications/autumn-budget-2017-documents/autumn-budget-2017">
          £809 billion
        </a>{' '}
        this year, and{' '}
        <a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31">
          less than 2%
        </a>{' '}
        of this goes to the EU. We wondered what impact that spending was having
        in the UK, and this map was an attempt to see.
      </p>
      <p>
        This isn&apos;t a complete list - we know that there are data sources
        and projects we haven&apos;t captured yet. Got something that should be
        on the map?{' '}
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfFuSkjkvuXWX70mHJJJrQlU4Ew6GKGd2XFLzGmZGLZbvFKfw/viewform?usp=sf_link">
          Get in touch
        </a>
        .
      </p>
      <h2>Data and Methodology</h2>
      <p>The map uses the following datasets:</p>
      <p>
        European Structural and Investment Funds (ESIF) 2014-2020. ESIF includes
        money from the European Social Fund (ESF), European Regional Development
        Fund (ERDF) and European Agricultural Fund for Rural Development
        (EAFRD). We got this data from separate datasets for{' '}
        <a href="https://www.gov.uk/government/publications/european-structural-and-investment-funds-useful-resources">
          England
        </a>
        ,{' '}
        <a href="https://beta.gov.scot/publications/esif-operations-funding/">
          Scotland
        </a>
        ,{' '}
        <a href="https://gov.wales/funding/eu-funds/2014-2020/approved-projects/?lang=en">
          Wales
        </a>{' '}
        and <a href="https://www.economy-ni.gov.uk/esf">Northern Ireland</a>.
      </p>
      <p>
        All funding direct from the EU budget centrally administered by the
        Commission from 2017 and 2016 from the{' '}
        <a href="http://ec.europa.eu/budget/fts/index_en.htm">
          Financial Transparency system
        </a>
      </p>
      <p>
        <a href="http://ec.europa.eu/programmes/creative-europe/projects/">
          Creative Europe
        </a>{' '}
        funding 2014-2020, which is the EU&apos;s programme for support for
        cultural and audiovisual funding.
      </p>
      <p>
        Projects funded by the European Union under the{' '}
        <a href="https://data.europa.eu/euodp/data/dataset/cordisfp7projects">
          seventh framework programme for research and technological development
          (FP7)
        </a>{' '}
        from 2007 to 2013 from the EU Open data portal.
      </p>
      <p>
        Common Agricultural Policy Funding{' '}
        <a href="http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/06307dc0-4dcb-4305-a3e2-a8fdeb2a2a25">
          data from 2015
        </a>
        .
      </p>
      <h2>What action can I take?</h2>
      <p>
        If you&apos;re interested in taking action off the back of this dataset,
        one thing you can do is email your MP to tell them your feelings.
        Emailing your MP can really help. Have a look at{' '}
        <a href="https://www.writetothem.com/">Write to them</a> for your
        MP&apos;s details.
      </p>
    </div>
  </React.Fragment>
)

export default About
