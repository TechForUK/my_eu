/* global describe it */

import assert from 'assert'

import { setupPolly } from './polly'

import { SearchStore, PLACE_NOT_FOUND } from '../src/search_store'

describe('SearchStore', function() {
  setupPolly({ recordIfMissing: false })

  function makeSearchStore() {
    const googleMaps = {
      LatLng: function(lat, lng) {
        this.lat = lat
        this.lng = lng
      }
    }
    const map = {}
    return new SearchStore(googleMaps, map)
  }

  it('caches places', async function() {
    const searchStore = makeSearchStore()
    const name = 'test place'
    const place = { geometry: 'test' }
    searchStore.storePlaceByName(name, place)
    const result = await searchStore.findPlaceByName(name)
    assert.strictEqual(place, result)
  })

  it('looks up postcodes with postcodes.io', async function() {
    this.polly.configure()
    const searchStore = makeSearchStore()
    const name = 'SW1A 1AA'
    const place = await searchStore.findPlaceByName(name)
    const location = place.geometry.location
    assert.strictEqual(51.501009, location.lat)
    assert.strictEqual(-0.141588, location.lng)
  })

  it('accepts missing postcodes with postcodes.io', async function() {
    this.polly.configure({ recordFailedRequests: true })
    const searchStore = makeSearchStore()
    const name = 'SW1A 1ZZ'
    try {
      await searchStore.findPlaceByName(name)
      assert.fail('expected error')
    } catch (err) {
      assert.strictEqual(PLACE_NOT_FOUND, err.message)
    }
  })
})
