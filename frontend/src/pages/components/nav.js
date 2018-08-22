import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import logoPath from '../../images/eusmall.png'

const Nav = ({ path }) => {
  let backToMap
  if (path !== '/') {
    backToMap = (
      <li className="nav-item">
        <a className="nav-link" href="/">
          Back to the Map
        </a>
      </li>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img
          src={logoPath}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="MyEU.UK Logo"
        />
        &nbsp;<div className="logo">myeu.uk</div>
      </a>
      <ul className="navbar-nav">
        {backToMap}
        <li className="nav-item">
          <a
            className={classNames('nav-link', { active: path === '/about/' })}
            href="/about/"
          >
            about
          </a>
        </li>
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  path: PropTypes.string
}

export default Nav
