import React from 'react'
import { Meta, Title } from 'react-head'

import Nav from '../components/nav'
import Share from '../components/share'
import { SITE_EMAIL_BODY, SITE_URL } from '../strings'

const About = () => (
  <React.Fragment>
    <Title>about - myeu.uk - see what the EU has done for you</Title>
    <Meta property="og:type" content="article" />
    <Nav path="/about/" />
    <div className="container my-eu-about">
      <h1>About MyEU</h1>
      <h2>Why MyEU?</h2>
      <p>
        The UK Government will spend about{' '}
        <a href="https://www.gov.uk/government/publications/autumn-budget-2017-documents/autumn-budget-2017">
          £809 billion
        </a>{' '}
        this year, and{' '}
        <a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31">
          less than 2%
        </a>{' '}
        of this goes to the EU.
      </p>
      <p>
        We wondered what impact that spending was having in the UK, and made
        this site to find out.
      </p>
      <p>
        This isn&apos;t a complete list &mdash; we know that there are data
        sources and projects we haven&apos;t captured yet. Got something that
        should be on the map?{' '}
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfFuSkjkvuXWX70mHJJJrQlU4Ew6GKGd2XFLzGmZGLZbvFKfw/viewform?usp=sf_link">
          Get in touch
        </a>
        .
      </p>
      <p>
        The myeu team are:{' '}
        <a href="https://twitter.com/jdleesmiller">John Lees-Miller</a>,{' '}
        <a href="https://twitter.com/h0peth0mas">Hope Thomas</a>,{' '}
        <a href="https://twitter.com/Kiyanak">Kiyana Katebi</a> and{' '}
        <a href="https://twitter.com/meloncholy">Andrew Weeks</a>.
      </p>
      <p>
        Thanks to <a href="https://techforuk.com/">Tech for UK</a> and{' '}
        <a href="https://www.bestforbritain.org/">Best for Britain</a> for their
        support.
      </p>
      <h2>Data and Methodology</h2>
      <p>
        myeu.uk{' '}
        <a href="https://github.com/GreatBritishHackOff/my_eu">
          is open source <i className="fab fa-github" />
        </a>
        .
      </p>
      <p>We used data from the following datasets to create myeu.uk:</p>
      <p>
        <ul>
          <li>
            European Structural and Investment Funds (ESIF) 2014-2020. ESIF
            includes money from the European Social Fund (ESF) and the European
            Regional Development Fund (ERDF). We got this data from separate
            datasets for:{' '}
            <ul>
              <li>
                England, from{' '}
                <a href="https://www.gov.uk/government/publications/european-structural-and-investment-funds-useful-resources">
                  Gov.uk
                </a>{' '}
                (Contains public sector information licensed under the{' '}
                <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
                  Open Government Licence v3.0.
                </a>
                ){' '}
              </li>
              <li>
                Scotland, from{' '}
                <a href="https://beta.gov.scot/publications/esif-operations-funding/">
                  Gov.scot
                </a>{' '}
                (Contains public sector information licensed under the{' '}
                <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
                  Open Government Licence v3.0.
                </a>
                ){' '}
              </li>
              <li>
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
                )
              </li>
              <li>
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
              </li>
            </ul>
          </li>

          <li>
            All funding direct from the EU budget centrally administered by the
            Commission from 2017 and 2016 from the{' '}
            <a href="http://ec.europa.eu/budget/fts/index_en.htm">
              Financial Transparency system
            </a>{' '}
            (c) European Union, 1995-2018
          </li>
          <li>
            <a href="http://ec.europa.eu/programmes/creative-europe/projects/">
              Creative Europe
            </a>{' '}
            funding 2014-2020, which is the EU&apos;s programme for support for
            cultural and audiovisual funding. (c) European Union, 1995-2018
          </li>
          <li>
            <a href="http://ec.europa.eu/programmes/erasmus-plus/projects/eplus-projects-compendium/">
              Erasmus +
            </a>{' '}
            funding 2007-2018, which is the EU&apos;s programme for support for
            young people. (c) European Union, 1995-2018
          </li>
          <li>
            Projects funded by the European Union under the{' '}
            <a href="https://data.europa.eu/euodp/data/dataset/cordisfp7projects">
              seventh framework programme for research and technological
              development (FP7)
            </a>{' '}
            from 2007 to 2013 and{' '}
            <a href="https://data.europa.eu/euodp/en/data/dataset/cordisH2020projects">
              Horizon 2020
            </a>{' '}
            from 2014 to 2020 from the EU Open data portal. (c) European Union,
            1995-2018
          </li>
          <li>
            Common Agricultural Policy Funding data from the Detail Data Portal
            for{' '}
            <a href="http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/e153b560-7538-442b-b3ab-a40bf4adf576">
              2014
            </a>{' '}
            and{' '}
            <a href="http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/06307dc0-4dcb-4305-a3e2-a8fdeb2a2a25">
              2015
            </a>{' '}
            and from{' '}
            <a href="http://cap-payments.defra.gov.uk/Download.aspx">DEFRA</a>{' '}
            for 2016 and 2017 (both licensed under the{' '}
            <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
              Open Government Licence v3.0.
            </a>
            ). This includes the European Agricultural Guarantee Fund (EAGF) and
            the European Agricultural Fund for Rural Development (EAFRD).
          </li>
          <li>
            Postcode data from{' '}
            <a href="https://www.freemaptools.com/download-uk-postcode-lat-lng.htm">
              FreeMapTools
            </a>{' '}
            . Postcode data contains Ordnance Survey data © Crown copyright and
            database right 2017, contains Royal Mail data © Royal Mail copyright
            and database right 2017 and contains National Statistics data ©
            Crown copyright and database right 2017{' '}
          </li>
          <li>
            <a href="https://grid.ac/">
              Global Research Identifier Database (GRID)
            </a>{' '}
            from Digital Science, shared under the{' '}
            <a href="https://creativecommons.org/publicdomain/zero/1.0/">
              Creative Commons Public Domain 1.0 International licence
            </a>{' '}
            .
          </li>
          <li>
            NHS staffing data are from NHS Digital&apos;s{' '}
            <a href="https://digital.nhs.uk/data-and-information/find-data-and-publications/supplementary-information/2018-supplementary-information-files/hchs-staff-by-staff-group-nationality-and-organisation-september-2017-and-june-2018">
              HCHS staff by staff group, nationality and organisation, September
              2017 and June 2018
            </a>{' '}
            dataset from June 2018, shared under the Open Government License.
          </li>
        </ul>
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
      <Share
        message="See what the EU has funded in your area"
        url={SITE_URL}
        emailBody={SITE_EMAIL_BODY}
      />
    </div>
  </React.Fragment>
)

export default About
