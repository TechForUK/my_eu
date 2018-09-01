/* global alert */

import PropTypes from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'

import AreaDataLayer from './area_data_layer'
import mapStyles from './map_styles'
import PackedPostcodes from './packed_postcodes'

import { getGoogleMapsApi, registerGoogleMap } from '../../google_maps'

// TODO change styles when zoomed in?
// https://stackoverflow.com/questions/3121400/google-maps-v3-how-to-change-the-map-style-based-on-zoom-level

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
    this.areaDataLayer = null
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

    const handleAreaClick = postcodeArea => {
      this.props.history.push(`/area/${postcodeArea}`)
      ReactGA.event({
        category: 'Map',
        action: 'Click Area',
        label: postcodeArea
      })
    }
    this.areaDataLayer = new AreaDataLayer(googleMaps, map, handleAreaClick)

    const handlePostcodeClick = (event, myEuData) => {
      const { outwardCode, inwardCode } = myEuData
      this.props.history.push(`/postcode/${outwardCode}/${inwardCode}`)
      ReactGA.event({
        category: 'Map',
        action: 'Click Postcode'
      })
    }

    this.packedPostcodes = new PackedPostcodes(
      googleMaps,
      map,
      handlePostcodeClick
    )
    this.zoomOnLoad()
  }

  zoomOnLoad() {
    const { outwardCode, inwardCode, postcodeArea } = this.props.match.params
    if (outwardCode && inwardCode) {
      this.packedPostcodes.zoomMapToPostcode(outwardCode, inwardCode)
    } else if (postcodeArea) {
      this.areaDataLayer.zoomMapToArea(postcodeArea)
    }
  }
}

Map.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      outwardCode: PropTypes.string,
      inwardCode: PropTypes.string,
      postcodeArea: PropTypes.string
    })
  })
}

export default Map
