import 'bootstrap'
import 'cross-fetch/polyfill'

// preset-env does not think we need this, but we get sporadic reports in
// rollbar without it.
import 'core-js/modules/es6.set'
import 'core-js/modules/es6.map'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import './scss/index.scss'
import './google_analytics'

import App from './components/app'

const container = document.getElementById('my-eu-root')
if (container)
  ReactDOM.hydrate(
    <HashRouter>
      <App />
    </HashRouter>,
    container
  )
