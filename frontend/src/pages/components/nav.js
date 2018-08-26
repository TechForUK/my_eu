import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import logoPath from '../../images/logo.svg'

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
<<<<<<< HEAD
<div className="logo">
=======
>>>>>>> d11aa81e8507f752505bcb4becf358df4d01f793
        <img
          src={logoPath}
          width="20"
          height="30"
          className="logoimage"
          alt="MyEU.UK Logo"
        />
        myeu.uk</div>
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
