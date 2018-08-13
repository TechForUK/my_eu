import React from 'react'
import logoPath from './images/eusmall.png'

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
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
          <a className="nav-link" href="/about/">
            About
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
