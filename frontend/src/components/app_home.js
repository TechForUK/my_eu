import React from 'react'

import SearchBox from './search_box'

const AppHome = () => {
  return (
    <React.Fragment>
      <h1>What has the EU done for your area?</h1>
      <SearchBox />
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
    </React.Fragment>
  )
}
export default AppHome
