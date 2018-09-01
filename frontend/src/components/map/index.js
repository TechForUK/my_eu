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
    this.packedPostcodes = null

    // If the user clicks a link outside the map, we want to show what they
    // clicked, but if the user has just clicked the map, don't change the view.
    // The first componentDidUpdate will be before the map data have loaded, so
    // we can also safely ignore the first update.
    this.ignoreNextUpdate = true
  }

  componentDidMount() {
    getGoogleMapsApi().then(this.setUpMap.bind(this))
  }

  componentDidUpdate(prevProps) {
    if (this.ignoreNextUpdate) {
      this.ignoreNextUpdate = false
      return
    }
    this.zoomToRouteParams()
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
      this.navigate(`/area/${postcodeArea}`)
      ReactGA.event({
        category: 'Map',
        action: 'Click Area',
        label: postcodeArea
      })
    }
    this.areaDataLayer = new AreaDataLayer(googleMaps, map, handleAreaClick)

    const handlePostcodeClick = (event, myEuData) => {
      const { outwardCode, inwardCode } = myEuData
      this.navigate(`/postcode/${outwardCode}/${inwardCode}`)
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
    this.zoomToRouteParams()
  }

  navigate(path) {
    this.ignoreNextUpdate = true
    this.props.history.push(path)
  }

  zoomToRouteParams() {
    const { outwardCode, inwardCode, postcodeArea } = this.props.match.params
    if (outwardCode && inwardCode && this.packedPostcodes) {
      this.packedPostcodes.zoomMapToPostcode(outwardCode, inwardCode)
    } else if (postcodeArea && this.areaDataLayer) {
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
