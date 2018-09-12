import 'bootstrap'
import 'cross-fetch/polyfill'
import 'promise-polyfill/src/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import './scss/index.scss'
import './error_tracking'
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
