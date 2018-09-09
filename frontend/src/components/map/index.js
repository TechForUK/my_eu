import PropTypes from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'

import AreaDataLayer from './area_data_layer'
import { ZOOMED_IN_STYLE, ZOOMED_OUT_STYLE } from './map_styles'
import PackedPostcodes from './packed_postcodes'

import { getGoogleMapsApi, registerGoogleMap } from '../../google_maps'
import getSearchStore from '../../search_store'
import logoPath from '../../images/logo.svg'
import { getSearchQuery } from '../../utilities'

const ZOOMED_IN_NAME = 'ZOOMED_IN'
const ZOOMED_OUT_NAME = 'ZOOMED_OUT'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
    this.googleMaps = null
    this.map = null
    this.searchMarker = null
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
    this.googleMaps = googleMaps
    this.map = new googleMaps.Map(this.divRef.current, {
      center: {
        lat: 54.595,
        lng: -2.888
      },
      zoom: 6,
      mapTypeId: 'ROADMAP',
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    })
    registerGoogleMap(this.map)

    this.setUpMapStyles()

    const handleAreaClick = postcodeArea => {
      ReactGA.event({
        category: 'Map',
        action: 'Click Area',
        label: postcodeArea
      })
      this.navigate(`/area/${postcodeArea}`)
    }
    this.areaDataLayer = new AreaDataLayer(
      googleMaps,
      this.map,
      handleAreaClick
    )

    const handlePostcodeClick = (event, myEuData) => {
      const { outwardCode, inwardCode } = myEuData
      ReactGA.event({
        category: 'Map',
        action: 'Click Postcode'
      })
      this.navigate(`/postcode/${outwardCode}/${inwardCode}`)
    }

    this.packedPostcodes = new PackedPostcodes(
      googleMaps,
      this.map,
      handlePostcodeClick
    )
    this.zoomToRouteParams()
  }

  setUpMapStyles() {
    var zoomedInStyledMapType = new this.googleMaps.StyledMapType(
      ZOOMED_IN_STYLE,
      { map: this.map, name: ZOOMED_IN_NAME }
    )
    this.map.mapTypes.set(ZOOMED_IN_NAME, zoomedInStyledMapType)

    var zoomedOutStyledMapType = new this.googleMaps.StyledMapType(
      ZOOMED_OUT_STYLE,
      { map: this.map, name: ZOOMED_OUT_NAME }
    )
    this.map.mapTypes.set(ZOOMED_OUT_NAME, zoomedOutStyledMapType)

    this.setMapStyleFromZoom()
    this.googleMaps.event.addListener(this.map, 'zoom_changed', () => {
      this.setMapStyleFromZoom()
    })
  }

  setMapStyleFromZoom() {
    if (this.map.getZoom() > 9) {
      this.map.setMapTypeId(ZOOMED_IN_NAME)
    } else {
      this.map.setMapTypeId(ZOOMED_OUT_NAME)
    }
  }

  navigate(path) {
    this.ignoreNextUpdate = true
    this.props.history.push(path)
  }

  zoomToRouteParams() {
    if (this.props.location.pathname === '/search') {
      const placeName = getSearchQuery(this.props.location)
      getSearchStore()
        .then(searchStore => searchStore.findPlaceByName(placeName))
        .then(place => {
          const bounds = this.findPlaceBounds(place)
          this.packedPostcodes.zoomMapWithMinMarkers(bounds)
          this.showPlaceMarker(place)
        })
      return
    }
    const { outwardCode, inwardCode, postcodeArea } = this.props.match.params
    if (outwardCode && inwardCode && this.packedPostcodes) {
      this.packedPostcodes.zoomMapToPostcode(outwardCode, inwardCode)
    } else if (postcodeArea && this.areaDataLayer) {
      this.areaDataLayer.zoomMapToArea(postcodeArea)
    }
  }

  findPlaceBounds(place) {
    const bounds = new this.googleMaps.LatLngBounds()
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport)
    } else {
      bounds.extend(place.geometry.location)
    }
    return bounds
  }

  showPlaceMarker(place) {
    // Clear out the old marker.
    if (this.placeMarker) {
      this.placeMarker.setMap(null)
      this.placeMarker = null
    }
    var icon = {
      url: logoPath,
      size: new this.googleMaps.Size(50, 50),
      anchor: new this.googleMaps.Point(25, 50),
      scaledSize: new this.googleMaps.Size(50, 50)
    }

    // Create a marker for each place.
    this.placeMarker = new this.googleMaps.Marker({
      map: this.map,
      icon: icon,
      title: place.name,
      position: place.geometry.location,
      clickable: false
    })
  }
}

Map.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string
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
