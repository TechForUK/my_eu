/* global describe it */

const assert = require('assert')

const { setupPolly } = require('./polly')

const { geocode } = require('../lib/geocode')

describe('geocode', () => {
  setupPolly({ recordIfMissing: false })

  it('returns postcode and constituency', async () => {
    const result = await geocode(51.6191248, -3.9346662)
    assert.strictEqual(result.postcode, 'SA1 1RP')
    assert.strictEqual(result.parliamentaryConstituency, 'Swansea West')
  })
})
