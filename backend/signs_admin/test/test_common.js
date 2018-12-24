/* global describe it */

const assert = require('assert')

const { datastoreWithRetries } = require('../lib/common')

describe('common', function() {
  describe('datastoreWithRetries', function() {
    it('returns the result if it succeeds', async function() {
      const result = await datastoreWithRetries(() => {
        return Promise.resolve(1)
      })
      assert.strictEqual(1, result)
    })

    it('retries on failure', async function() {
      let index = 0
      const result = await datastoreWithRetries(() => {
        if (index++ === 0) return Promise.reject(new Error('Try again'))
        return Promise.resolve(1)
      }, 1)
      assert.strictEqual(1, result)
    })

    it('retries on failure up to a limit', async function() {
      let index = 0
      try {
        await datastoreWithRetries(() => {
          if (index++ <= 5) return Promise.reject(new Error('Try again'))
          return Promise.resolve(1)
        }, 1)
        assert.fail('should have given up')
      } catch (err) {
        assert.strictEqual(err.message, 'Try again')
      }
    })
  })
})
