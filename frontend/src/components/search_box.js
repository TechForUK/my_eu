/* global alert */

import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'

import { getGoogleMapsApiAndMap } from '../google_maps'
import getSearchStore, {
  AUTOCOMPLETE_OPTIONS,
  FIELDS,
  PLACE_NOT_FOUND
} from '../search_store'
import { getSearchQuery } from '../utilities'

class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.marker = null
    this.formRef = React.createRef()
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    getGoogleMapsApiAndMap().then(([googleMaps, map]) =>
      this.setUpAutocomplete(googleMaps, map)
    )
  }

  render() {
    return (
      <form ref={this.formRef}>
        <div className="form-group">
          <label>
            The EU invests around{' '}
            <a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/articles/theukcontributiontotheeubudget/2017-10-31">
              £5 billion
            </a>{' '}
            a year in the UK. Search by your address or postcode to see some of
            the investments near you:
            <div className="input-group">
              <input
                ref={this.inputRef}
                className="form-control"
                placeholder="e.g. SW1A 1AA"
                defaultValue={getSearchQuery(this.props.location)}
              />
              <div className="input-group-append">
                <input
                  className="btn btn-outline-primary"
                  type="submit"
                  value="&#x1f50d;"
                />
              </div>
            </div>
          </label>
        </div>
      </form>
    )
  }

  setUpAutocomplete(googleMaps, map) {
    // We may have been unmounted.
    if (!this.inputRef.current || !this.formRef.current) return

    const autocomplete = new googleMaps.places.Autocomplete(
      this.inputRef.current,
      AUTOCOMPLETE_OPTIONS
    )
    autocomplete.setFields(FIELDS)

    // Bias the results toward the current view.
    autocomplete.bindTo('bounds', map)

    // If the user presses enter or clicks the submit button, the place doesn't
    // get picked up from the fancy dropdown, so we need extra logic.
    //
    // 1. Happy path: user types in query, selects from dropdown. The
    // place_changed event fires. The geometry is present. The submit event does
    // not fire. All is well.
    //
    // 2. User types in query and presses enter. The place_changed event fires,
    // but there is no geometry. The form submit fires, and we look up the user's
    // query using the AutocompleteService and then find it with the
    // PlacesService.
    //
    // 3. User types in query and then clicks the submit button. The place_changed
    // event does not fire. The submit event does fire, and we proceed as in (2).
    //
    // Approach for (2-3) based on https://stackoverflow.com/a/28100636/2053820
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry) this.markPlace(place)
    })

    this.formRef.current.onsubmit = event => {
      this.inputRef.current.blur() // to hide keyboard on mobile
      this.markPlace(null)
      return false
    }
  }

  markPlace(place) {
    const name = this.inputRef.current.value
    if (name.length === 0) return
    getSearchStore()
      .then(searchStore => {
        if (place) {
          searchStore.storePlaceByName(name, place)
        } else {
          return searchStore.findPlaceByName(name)
        }
      })
      .then(() => {
        this.props.history.push({ pathname: '/search', search: `${name}` })
      })
      .catch(err => {
        if (err.message === PLACE_NOT_FOUND) {
          alert("Sorry, we couldn't find that place. Please try again.")
        } else {
          throw err
        }
      })
  }
}

SearchBox.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withRouter(SearchBox)
