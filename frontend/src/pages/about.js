import React from 'react'
import { Title } from 'react-head'

import Nav from './components/nav'

const About = () => (
  <React.Fragment>
    <Title>About - MyEU.UK</Title>
    <Nav path="/about/" />
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
        (EAFRD). We got this data from separate datasets for:{' '}
      </p>
      <p>
        England, from{' '}
        <a href="https://www.gov.uk/government/publications/european-structural-and-investment-funds-useful-resources">
          Gov.uk
        </a>{' '}
        (Contains public sector information licensed under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0.
        </a>
        ) , <br />
        Scotland, from{' '}
        <a href="https://beta.gov.scot/publications/esif-operations-funding/">
          Gov.scot
        </a>{' '}
        (Contains public sector information licensed under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0.
        </a>
        ) , <br />
        Wales from{' '}
        <a href="https://gov.wales/funding/eu-funds/2014-2020/approved-projects/?lang=en">
          Gov.wales
        </a>{' '}
        (Welsh Governement ©{' '}
        <a href="https://gov.wales/copyright_statement/?lang=en">
          Crown copyright 2018
        </a>{' '}
        licensed under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0.
        </a>
        ) <br />
        Northern Ireland from{' '}
        <a href="https://www.economy-ni.gov.uk/esf">
          Department for the Economy NI
        </a>{' '}
        (Department for the Economy ©{' '}
        <a href="https://www.economy-ni.gov.uk/crown-copyright">
          Crown copyright 2018
        </a>{' '}
        licensed under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0.
        </a>
        ).
      </p>
      <p>
        All funding direct from the EU budget centrally administered by the
        Commission from 2017 and 2016 from the{' '}
        <a href="http://ec.europa.eu/budget/fts/index_en.htm">
          Financial Transparency system
        </a>{' '}
        (c) European Union, 1995-2018
      </p>
      <p>
        <a href="http://ec.europa.eu/programmes/creative-europe/projects/">
          Creative Europe
        </a>{' '}
        funding 2014-2020, which is the EU&apos;s programme for support for
        cultural and audiovisual funding. (c) European Union, 1995-2018
      </p>
      <p>
        Projects funded by the European Union under the{' '}
        <a href="https://data.europa.eu/euodp/data/dataset/cordisfp7projects">
          seventh framework programme for research and technological development
          (FP7)
        </a>{' '}
        from 2007 to 2013 from the EU Open data portal. (c) European Union,
        1995-2018
      </p>
      <p>
        Common Agricultural Policy Funding data from 2015 from the{' '}
        <a href="http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/06307dc0-4dcb-4305-a3e2-a8fdeb2a2a25">
          Detail Data Portal
        </a>{' '}
        (licensed under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0.
        </a>
        ) .
      </p>
      <h2>What action can I take?</h2>
      <p>
        If you&apos;re interested in taking action off the back of this dataset,
        one thing you can do is email your MP to tell them your feelings.
        Emailing your MP can really help.{' '}
        <a href="https://www.bestforbritain.org/contact_your_mp">
          Contact your MP
        </a>{' '}
        and tell them how you feel.
      </p>
    </div>
  </React.Fragment>
)

export default About
