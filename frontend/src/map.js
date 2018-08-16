/* global google alert */

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import loadGoogleMapsApi from './load_google_maps_api'
import twttr from './social/twitter'

import eusmallPath from './images/eusmall.png'
import capPath from './data/cap_by_area.geo.json'
import beneficiariesPath from './data/beneficiaries.geo.json'
import cordisPath from './data/cordis_data.geo.json'
import scotlandPath from './data/scotland_data.geo.json'
import walesPath from './data/wales_data.geo.json'
import niPath from './data/ni_data.geo.json'
import creativePath from './data/creative_data.geo.json'
import fts2016Path from './data/fts2016_data.geo.json'
import fts2017Path from './data/fts2017_data.geo.json'

// TODO change styles when zoomed in?
// https://stackoverflow.com/questions/3121400/google-maps-v3-how-to-change-the-map-style-based-on-zoom-level

const WHITE = '#fcfcfc'
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: WHITE }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { hue: '#5f94ff' }, { lightness: 60 }]
  }
]

function getGeometryLatLngBounds(googleMaps, geometry) {
  const bounds = new googleMaps.LatLngBounds()
  geometry.forEachLatLng(latLng => bounds.extend(latLng))
  return bounds
}

function updateInfoWindowContent(map, infoWindow, component) {
  // Clean up previous window, if any.
  const container = infoWindow.getContent()
  ReactDOM.unmountComponentAtNode(container)
  infoWindow.close()

  // Set maximum width for mobile-friendliness.
  // Process is based on https://developers.google.com/maps/documentation/javascript/reference/3/info-window#InfoWindowOptions.maxWidth
  const INFO_WINDOW_PADDING = 60 // determined empirically
  ReactDOM.render(component, container)
  infoWindow.setOptions({
    maxWidth: $(map.getDiv()).width() - INFO_WINDOW_PADDING
  })
  infoWindow.setContent(container)
  infoWindow.open(map)
  twttr.widgets.load(container)
}

function formatRoundPercentage(fraction) {
  return fraction.toLocaleString('en-GB', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

function formatRoundPounds(pounds) {
  return pounds.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

function formatRoundEuros(euros) {
  return euros.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

const CapInfo = ({ feature }) => {
  const areaName = feature.getProperty('postcodeAreaName')
  const count = feature.getProperty('count')
  const total = feature.getProperty('total')
  const totalAgriculturalGuaranteeFund =
    feature.getProperty('directEAGF') + feature.getProperty('otherEAGF')
  const totalRuralDevelopment = feature.getProperty('ruralDevelopment')
  const displayCount = count.toLocaleString()
  const displayTotal = formatRoundPounds(total)
  const displayAverage = formatRoundPounds(
    feature.getProperty('total') / feature.getProperty('count')
  )
  return (
    <div className="my-eu-info-window">
      <h2>Funding for Farms in {areaName}</h2>
      <p className="lead">
        In 2015, the EU provided {displayTotal} in funding to {displayCount}{' '}
        farms in {areaName}.
      </p>
      <h3>Funding Breakdown</h3>
      <table className="table table-sm">
        <tbody>
          <tr>
            <th>European Agricultural Guarantee Fund</th>
            <td align="right">
              {formatRoundPounds(totalAgriculturalGuaranteeFund)}
            </td>
          </tr>
          <tr>
            <th>European Agricultural Fund for Rural Development</th>
            <td align="right">{formatRoundPounds(totalRuralDevelopment)}</td>
          </tr>
          <tr>
            <th>Total Funding</th>
            <td align="right">{displayTotal}</td>
          </tr>
          <tr>
            <th>Number of Farms</th>
            <td align="right">{displayCount}</td>
          </tr>
          <tr>
            <th>Average Funding per Farm</th>
            <td align="right">{displayAverage}</td>
          </tr>
        </tbody>
      </table>
      <p>
        The European Agricultural Gurantee Fund finances direct payments to
        farmers and regulations for agricultural markets. The European
        Agricultural Fund for Rural Development finances programmes to make
        farm, forest and agri-food businesses more competitive, protect the
        environment, support rural economies and improve quality of life in
        rural areas.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

CapInfo.propTypes = {
  feature: PropTypes.object
}

function addCapData(googleMaps, map, infoWindow) {
  function getFeatureValue(feature) {
    return feature.getProperty('total') / feature.getProperty('count')
  }

  const layer = new googleMaps.Data({ map })
  layer.loadGeoJson(capPath, { idPropertyName: 'name' }, setUpCapDataLayer)

  function setUpCapDataLayer(features) {
    const maxFeatureValue = Math.max(...features.map(getFeatureValue))
    const scale = d3Scale
      .scaleSequential(d3ScaleChromatic.interpolateBlues)
      .domain([0, maxFeatureValue])

    layer.setStyle(function(feature) {
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

    layer.addListener('click', function(event) {
      event.feature.forEachProperty(function(value, property) {
        const feature = event.feature
        const bounds = getGeometryLatLngBounds(
          googleMaps,
          feature.getGeometry()
        )

        infoWindow.setPosition(bounds.getCenter())
        updateInfoWindowContent(map, infoWindow, <CapInfo feature={feature} />)
        map.fitBounds(bounds)
      })
    })
  }
}

// NB: These are ESIF. There are more data we can pull in here, e.g. project
// descriptions.
const BeneficiaryInfo = ({ feature }) => {
  const beneficiary = feature.getProperty('beneficiary')
  const project = feature.getProperty('project')
  const euInvestment = feature.getProperty('eu_investment')
  const projectCost = feature.getProperty('project_cost')
  const displayEuInvestment = formatRoundPounds(euInvestment)
  const displayPercentage = formatRoundPercentage(euInvestment / projectCost)
  const tweet = `The EU provided ${beneficiary} with ${displayEuInvestment} to fund ${project}.`

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweet
  )}`

  let lead
  if (!projectCost || euInvestment >= projectCost) {
    // Note: Some are overfunded.
    lead = (
      <p className="lead">
        The EU provided {beneficiary} with {displayEuInvestment} to fund this
        project.
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        The EU provided {beneficiary} with {displayEuInvestment} to fund{' '}
        {displayPercentage} of this project.
      </p>
    )
  }

  return (
    <div className="my-eu-info-window">
      <h2>{project}</h2>
      {lead}
      <p>
        The EU supported this project through its European Structural and
        Investment Funds, which are the EU&apos;s main funding programmes for
        supporting growth and jobs in the UK and across the EU.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
      <p>
        <a className="twitter-share-button" href={twitterLink}>
          Tweet
        </a>
      </p>
    </div>
  )
}

BeneficiaryInfo.propTypes = {
  feature: PropTypes.object
}

// NB: More data are available in many cases, e.g. detailed project
// descriptions and sometimes links.
const CordisInfo = ({ feature }) => {
  let title = feature.getProperty('title')
  const name = feature.getProperty('name')
  const acronym = feature.getProperty('acronym')
  const ecContribution = feature.getProperty('ecUKContribution')
  const totalCost = feature.getProperty('totalCost')

  // Some have no title, some have the acronym in the title.
  if (!title) title = `Project "${acronym}"`

  const displayEcContribution = formatRoundPounds(ecContribution)
  const displayPercentage = formatRoundPercentage(ecContribution / totalCost)

  let lead
  if (!totalCost || ecContribution >= totalCost) {
    lead = (
      <p className="lead">
        The EU provided {name} with {displayEcContribution} to fund the &quot;
        {acronym}
        &quot; research project.
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        The EU provided {name} with {displayEcContribution} to fund{' '}
        {displayPercentage} of the &quot;
        {acronym}
        &quot; research project.
      </p>
    )
  }

  return (
    <div className="my-eu-info-window">
      <h2>{title}</h2>
      {lead}
      <p>
        The European Research Council funds research that saves lives and drives
        innovation in the UK and across the EU.{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

CordisInfo.propTypes = {
  feature: PropTypes.object
}

// creative europe
const CreativeInfo = ({ feature }) => {
  let title = feature.getProperty('Project Title')
  const coordinator = feature.getProperty("Coordinator's name")
  const partner = feature.getProperty('Partner_name')
  const euGrant = feature.getProperty(
    "EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project's lifetime will not be reflected here.)"
  )
  const website = feature.getProperty('Partner_website')

  const displayEuGrant = formatRoundEuros(euGrant)

  let lead
  if (feature.getProperty('Partner_website')) {
    lead = (
      <p className="lead">
        {partner} was part of the {title} project, coordinated by {coordinator}.
        The EU provided {displayEuGrant} for this project as a whole. You can
        see more info about the project at their website here: {website}
      </p>
    )
  } else {
    lead = (
      <p className="lead">
        {partner} was part of the {title} project, coordinated by {coordinator}.
        The EU provided {displayEuGrant} for this project as a whole.
      </p>
    )
  }

  return (
    <div className="my-eu-info-window">
      <h2>{partner}</h2>
      {lead}
      <p>
        This grant as part of Creative Europe, which is a €1.46 billion European
        Union programme for the cultural and creative sectors for the years
        2014-2020..{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

CreativeInfo.propTypes = {
  feature: PropTypes.object
}

// start fts
const FTSInfo = ({ feature }) => {
  let budgetLine = feature.getProperty('budget_line_name_and_number')
  const benificiary = feature.getProperty('name_of_beneficiary')
  const amount = feature.getProperty('Amount')
  const year = feature.getProperty('Year')

  const displayEuGrant = formatRoundEuros(amount)

  let lead

  lead = (
    <p className="lead">
      In {year}, the EU provided {benificiary} {displayEuGrant} as part of the{' '}
      {budgetLine} programme.
    </p>
  )

  return (
    <div className="my-eu-info-window">
      <h2>{benificiary}</h2>
      {lead}
      <p>
        This grant was from the EU budget centrally administered by the
        Commission{' '}
        <a href="/about" target="_blank">
          Find out more.
        </a>
      </p>
    </div>
  )
}

FTSInfo.propTypes = {
  feature: PropTypes.object
}
// end fts

const GenericInfo = ({ feature }) => {
  const body = []
  feature.forEachProperty(function(value, property) {
    body.push(
      <tr>
        <th>{property}</th>
        <td>{value}</td>
      </tr>
    )
  })

  return (
    <table>
      <tbody>{body}</tbody>
    </table>
  )
}

GenericInfo.propTypes = {
  feature: PropTypes.object
}

function makePointInfoWindow(feature) {
  if (feature.getProperty('beneficiary')) {
    return <BeneficiaryInfo feature={feature} />
  } else if (feature.getProperty('ecMaxContribution')) {
    return <CordisInfo feature={feature} />
  } else if (feature.getProperty('EU funds awarded')) {
    // walesPath
    return <GenericInfo feature={feature} />
  } else if (feature.getProperty('Total Eligible Project Cost')) {
    // niData
    return <GenericInfo feature={feature} />
  } else if (
    feature.getProperty(
      "EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project's lifetime will not be reflected here.)"
    )
  ) {
    // creative europe data
    return <CreativeInfo feature={feature} />
  } else if (feature.getProperty('budget_line_name_and_number')) {
    // creative europe data
    return <FTSInfo feature={feature} />
  }
  return <GenericInfo feature={feature} />
}

function addPointData(googleMaps, map, path, infoWindow) {
  const layer = new googleMaps.Data({ map })
  layer.loadGeoJson(path)
  layer.setStyle(function(feature) {
    return { icon: eusmallPath }
  })
  layer.addListener('click', function(event) {
    const feature = event.feature
    infoWindow.setPosition(feature.getGeometry().get())
    updateInfoWindowContent(map, infoWindow, makePointInfoWindow(feature))
  })
}

function setUpMap(googleMaps) {
  const map = new googleMaps.Map(document.getElementById('my-eu-map'), {
    center: {
      lat: 54.595,
      lng: -2.888
    },
    zoom: 6,
    styles: mapStyles,
    mapTypeControl: false,
    streetViewControl: false
  })

  const infoWindow = new google.maps.InfoWindow({
    content: document.createElement('div')
  })

  setUpSearchBox(googleMaps, map)
  addCapData(googleMaps, map, infoWindow)
  addPointData(googleMaps, map, beneficiariesPath, infoWindow)
  addPointData(googleMaps, map, cordisPath, infoWindow)
  addPointData(googleMaps, map, scotlandPath, infoWindow)
  addPointData(googleMaps, map, walesPath, infoWindow)
  addPointData(googleMaps, map, niPath, infoWindow)
  addPointData(googleMaps, map, creativePath, infoWindow)
  addPointData(googleMaps, map, fts2016Path, infoWindow)
  addPointData(googleMaps, map, fts2017Path, infoWindow)
}

function setUpSearchBox(googleMaps, map) {
  const input = document.getElementById('my-eu-search-box')
  const autocomplete = new googleMaps.places.Autocomplete(input, {
    types: ['geocode'],
    componentRestrictions: { country: ['UK'] }
  })

  // Only return fields we need, to avoid paying lots of money.
  autocomplete.setFields(['geometry', 'formatted_address', 'icon'])

  // Bias the results toward the current view.
  autocomplete.bindTo('bounds', map)

  // TODO better hacks: https://stackoverflow.com/a/28100636/2053820
  // but might still want the below to prevent a form submit... but then again
  // maybe just block the form submit more directly.

  // Don't submit the form if the user presses enter.
  googleMaps.event.addDomListener(input, 'keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  })

  let marker = null
  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace()
    if (!place.geometry) {
      alert("Sorry, we couldn't find that place. Please try again.")
      return
    }

    // Clear out the old marker.
    if (marker) {
      marker.setMap(null)
      marker = null
    }

    // For each place, get the icon, name and location.
    var bounds = new googleMaps.LatLngBounds()

    var icon = {
      url: place.icon,
      size: new googleMaps.Size(71, 71),
      origin: new googleMaps.Point(0, 0),
      anchor: new googleMaps.Point(17, 34),
      scaledSize: new googleMaps.Size(25, 25)
    }

    // Create a marker for each place.
    marker = new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    })

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport)
    } else {
      bounds.extend(place.geometry.location)
    }

    map.fitBounds(bounds)
    if (map.getZoom() > 12) {
      map.setZoom(12)
    }
  })
}

export default class Map extends React.Component {
  componentDidMount() {
    loadGoogleMapsApi.then(setUpMap)
  }

  render() {
    return <div id="my-eu-map" />
  }
}

const container = document.getElementById('my-eu-map')
if (container) ReactDOM.render(<Map />, container)
