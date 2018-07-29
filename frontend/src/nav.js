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
          alt="My.EU Logo"
        />
        &nbsp;My.EU
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </nav>
  )
}

export default Nav
