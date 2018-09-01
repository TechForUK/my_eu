import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import capPath from '../../data/cap_by_area.geo.json'

function getGeometryLatLngBounds(googleMaps, geometry) {
  const bounds = new googleMaps.LatLngBounds()
  geometry.forEachLatLng(latLng => bounds.extend(latLng))
  return bounds
}

function getFeatureValue(feature) {
  return Math.pow(feature.getProperty('total'), 0.33)
}

export default class AreaDataLayer {
  constructor(googleMaps, map, handleClick) {
    this.googleMaps = googleMaps
    this.map = map
    this.handleClick = handleClick

    this.layer = new googleMaps.Data({ map })
    this._loadData = this._loadGeoJson()
    this._loadData.then(this._createLayer.bind(this))
  }

  zoomMapToArea(postcodeArea) {
    const findAreaAndZoom = () => {
      const feature = this.layer.getFeatureById(postcodeArea)
      if (!feature) return
      this._zoomMapToFeature(feature)
    }
    this._loadData.then(findAreaAndZoom)
  }

  _loadGeoJson() {
    let handleLoaded
    const promiseLoaded = new Promise(resolve => {
      handleLoaded = resolve
    })
    this.layer.loadGeoJson(
      capPath,
      { idPropertyName: 'postcodeArea' },
      handleLoaded
    )
    return promiseLoaded
  }

  _createLayer(features) {
    const maxFeatureValue = Math.max(...features.map(getFeatureValue))
    const scale = d3Scale
      .scaleSequential(d3ScaleChromatic.interpolatePuBu)
      .domain([0, maxFeatureValue])

    this.layer.setStyle(function setAreaStyle(feature) {
      const opacity = 0.75
      const color = scale(getFeatureValue(feature))
      return {
        fillColor: color,
        fillOpacity: opacity,
        strokeWeight: 1,
        strokeColor: color,
        strokeOpacity: opacity / 2
      }
    })

    this.layer.addListener('click', this._handleClickEvent.bind(this))
    this.layer.addListener('mouseover', this._handleMouseover.bind(this))
    this.layer.addListener('mouseout', this._handleMouseout.bind(this))
  }

  _zoomMapToFeature(feature) {
    const bounds = getGeometryLatLngBounds(
      this.googleMaps,
      feature.getGeometry()
    )
    this.map.fitBounds(bounds)
  }

  _handleClickEvent(event) {
    const feature = event.feature
    this._zoomMapToFeature(feature)
    this.handleClick(feature.getId())
  }

  _handleMouseover(event) {
    this.layer.revertStyle()
    this.layer.overrideStyle(event.feature, {
      strokeColor: '#fc0',
      strokeOpacity: 1,
      strokeWeight: 2,
      zIndex: 1
    })
  }

  _handleMouseout(event) {
    this.layer.revertStyle()
  }
}
