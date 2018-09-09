import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import logoWithTextPath from '../images/logo_with_text.svg'

const Nav = ({ path }) => {
  let backToMap
  if (path !== '/') {
    backToMap = (
      <li className="nav-item">
        <a className="nav-link" href="/">
          back to the map
        </a>
      </li>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logoWithTextPath} height="30" alt="MyEU.UK Logo" />
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
