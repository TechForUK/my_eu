import React from 'react'
import { Link } from 'react-router-dom'

const SearchAgain = () => {
  return (
    <li className="nav-item">
      <Link to="/" className="nav-link">
        <i className="fa fa-undo" />
        &nbsp; Search Again
      </Link>
    </li>
  )
}

export default SearchAgain
