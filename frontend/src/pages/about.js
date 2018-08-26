import React from 'react'
import { Title } from 'react-head'

import Nav from './components/nav'

const About = () => (
  <React.Fragment>
    <Title>About - MyEU.UK</Title>
    <Nav path="/about/" />
    <div className="container">
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
        We wondered what impact that spending was having
        in the UK, and made this site to find out.
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
      <p>We used data from the following datasets to create myeu.uk:</p>
      <p>
        <ul>
          <li>
        European Structural and Investment Funds (ESIF) 2014-2020. ESIF includes
        money from the European Social Fund (ESF), European Regional Development
        Fund (ERDF) and European Agricultural Fund for Rural Development
        (EAFRD). We got this data from separate datasets for:{' '}
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

        ) </li>
        <li>
        Scotland, from{' '}
        <a href="https://beta.gov.scot/publications/esif-operations-funding/">
          Gov.scot
        </a>{' '}
        (Contains public sector information licensed under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0.
        </a>
      ) </li>
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
        Projects funded by the European Union under the{' '}
        <a href="https://data.europa.eu/euodp/data/dataset/cordisfp7projects">
          seventh framework programme for research and technological development
          (FP7)
        </a>{' '}
        from 2007 to 2013 and{' '}
        <a href="https://data.europa.eu/euodp/en/data/dataset/cordisH2020projects">
          Horizon 2020
        </a>{' '}
        from 2014 to 2020 from the EU Open data portal. (c) European Union,
        1995-2018
</li>
<li>
        Common Agricultural Policy Funding data from the Detail Data Portal for{' '}
        <a href="http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/06307dc0-4dcb-4305-a3e2-a8fdeb2a2a25">
          2015
        </a>{' '}
        and{' '}
        <a href="http://data.nicva.org/dataset/common-agricultural-policy-cap-payments/resource/e153b560-7538-442b-b3ab-a40bf4adf576">
          2014
        </a>{' '}
        and from{' '}
        <a href="http://cap-payments.defra.gov.uk/Download.aspx">DEFRA</a> for
        2016 and 2017 (both licensed under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0.
        </a>
        ) .
</li>
<li>

        Postcode data from {' '}
      <a href="https://www.freemaptools.com/download-uk-postcode-lat-lng.htm">
  FreeMapTools
</a>{' '}. Postcode data contains Ordnance Survey data © Crown copyright and database right 2017, contains Royal Mail data © Royal Mail copyright and database right 2017 and contains National Statistics data © Crown copyright and database right 2017

  {' '}
</li>
<li>
 <a href="https://grid.ac/">
Global Research Identifier Database (GRID)
 </a>{' '}
   from Digital Science, shared under the
  {' '}
  <a href="https://creativecommons.org/publicdomain/zero/1.0/">
Creative Commons Public Domain 1.0 International licence
</a>{' '}.
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
      </p>
    </div>
  </React.Fragment>
)

export default About
