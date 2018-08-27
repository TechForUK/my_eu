import 'bootstrap'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

// import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import './scss/index.scss'
import './google_analytics'

import './social/twitter'

import './components/map'

import App from './components/app'

const container = document.getElementById('my-eu-root')
if (container)
  ReactDOM.hydrate(
    <HashRouter>
      <App />
    </HashRouter>,
    container
  )
