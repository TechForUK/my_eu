/* global alert */

import PropTypes from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import { withRouter } from 'react-router-dom'

import addCapData from './cap_data'
import mapStyles from './map_styles'
import addPackedPostcodeLayer from './packed_postcodes'

import { getGoogleMapsApi, registerGoogleMap } from '../../google_maps'

// TODO change styles when zoomed in?
// https://stackoverflow.com/questions/3121400/google-maps-v3-how-to-change-the-map-style-based-on-zoom-level

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
  }

  componentDidMount() {
    getGoogleMapsApi().then(this.setUpMap.bind(this))
  }

  render() {
    return <div ref={this.divRef} id="my-eu-map" />
  }

  setUpMap(googleMaps) {
    const map = new googleMaps.Map(this.divRef.current, {
      center: {
        lat: 54.595,
        lng: -2.888
      },
      zoom: 6,
      styles: mapStyles,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    })
    registerGoogleMap(map)

    // addCapData(googleMaps, map, infoWindow, updateInfoWindowContent)

    const handlePostcodeClick = (event, myEuData) => {
      const { outwardCode, inwardCode } = myEuData
      this.props.history.push(`/postcode/${outwardCode}/${inwardCode}`)
      ReactGA.event({
        category: 'Map',
        action: 'Click Postcode'
      })
    }

    addPackedPostcodeLayer(googleMaps, map, handlePostcodeClick).catch(
      function() {
        alert('Sorry, we could not load the map data. Please try again.')
      }
    )
  }
}

Map.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withRouter(Map)
