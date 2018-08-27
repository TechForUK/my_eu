import 'bootstrap'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

import $ from 'jquery'

import './scss/index.scss'
import './google_analytics'

import './social/twitter'

import './components/map'

// Hack to move the info bar below the map on mobile.
// The bottomRow's visibility is controlled by a media query.
$(function() {
  const infoBar = $('#my-eu-info')
  const sideContainer = $('#my-eu-side-info-container')
  const bottomContainer = $('#my-eu-bottom-info-container')
  const bottomRow = $('#my-eu-bottom-info-row')
  function moveInfoBar() {
    if (bottomRow.is(':visible')) {
      infoBar.appendTo(bottomContainer)
    } else {
      infoBar.appendTo(sideContainer)
    }
  }
  $(window).resize(moveInfoBar)
  moveInfoBar()
})
