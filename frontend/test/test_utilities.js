/* global describe it */

import assert from 'assert'

import {
  formatSemiCompact,
  formatCompact,
  definitePluraliseList,
  toSentence
} from '../src/utilities'

describe('utilities', function() {
  describe('formatSemiCompact()', function() {
    it('formats numbers with at most four letters', function() {
      assert.strictEqual(formatSemiCompact(1), '1')

      assert.strictEqual(formatSemiCompact(10), '10')
      assert.strictEqual(formatSemiCompact(100), '100')

      assert.strictEqual(formatSemiCompact(999), '1K')
      assert.strictEqual(formatSemiCompact(1000), '1K')
      assert.strictEqual(formatSemiCompact(1001), '1K')
      assert.strictEqual(formatSemiCompact(9000), '9K')

      assert.strictEqual(formatSemiCompact(9501), '10K')
      assert.strictEqual(formatSemiCompact(9999), '10K')
      assert.strictEqual(formatSemiCompact(10000), '10K')
      assert.strictEqual(formatSemiCompact(10001), '10K')
      assert.strictEqual(formatSemiCompact(99000), '99K')
      assert.strictEqual(formatSemiCompact(99499), '99K')

      assert.strictEqual(formatSemiCompact(99500), '100K')
      assert.strictEqual(formatSemiCompact(100000), '100K')
      assert.strictEqual(formatSemiCompact(900000), '900K')
      assert.strictEqual(formatSemiCompact(949999), '950K')

      assert.strictEqual(formatSemiCompact(999999), '1M')
      assert.strictEqual(formatSemiCompact(1000000), '1M')
      assert.strictEqual(formatSemiCompact(9449999), '9M')
      assert.strictEqual(formatSemiCompact(9500000), '10M')
      assert.strictEqual(formatSemiCompact(10000000), '10M')
      assert.strictEqual(formatSemiCompact(99499999), '99M')

      assert.strictEqual(formatSemiCompact(99500000), '100M')
      assert.strictEqual(formatSemiCompact(100000000), '100M')
      assert.strictEqual(formatSemiCompact(949999999), '950M')

      assert.strictEqual(formatSemiCompact(994000000), '990M')
      assert.strictEqual(formatSemiCompact(1000000000), '1B')
      assert.strictEqual(formatSemiCompact(10000000000), '10B')
      assert.strictEqual(formatSemiCompact(99499999999), '99B')
      assert.strictEqual(formatSemiCompact(99500000000), '100B')
      assert.strictEqual(formatSemiCompact(99500000000), '100B')

      assert.strictEqual(formatSemiCompact(994000000000), '990B')
      assert.strictEqual(formatSemiCompact(999999999999), '>1T')
    })
  })

  describe('formatCompact()', function() {
    it('formats numbers with at most three letters', function() {
      assert.strictEqual(formatCompact(1), '1')

      assert.strictEqual(formatCompact(10), '10')
      assert.strictEqual(formatCompact(100), '100')
      assert.strictEqual(formatCompact(999), '999')

      assert.strictEqual(formatCompact(1000), '1K')
      assert.strictEqual(formatCompact(1001), '1K')
      assert.strictEqual(formatCompact(9000), '9K')

      assert.strictEqual(formatCompact(9501), '10K')
      assert.strictEqual(formatCompact(9999), '10K')
      assert.strictEqual(formatCompact(10000), '10K')
      assert.strictEqual(formatCompact(10001), '10K')
      assert.strictEqual(formatCompact(99000), '99K')
      assert.strictEqual(formatCompact(99499), '99K')

      assert.strictEqual(formatCompact(99500), '.1M')
      assert.strictEqual(formatCompact(100000), '.1M')
      assert.strictEqual(formatCompact(900000), '.9M')
      assert.strictEqual(formatCompact(949999), '.9M')

      assert.strictEqual(formatCompact(950000), '1M')
      assert.strictEqual(formatCompact(1000000), '1M')
      assert.strictEqual(formatCompact(9499999), '9M')
      assert.strictEqual(formatCompact(9500000), '10M')
      assert.strictEqual(formatCompact(10000000), '10M')
      assert.strictEqual(formatCompact(99499999), '99M')

      assert.strictEqual(formatCompact(99500000), '.1B')
      assert.strictEqual(formatCompact(100000000), '.1B')
      assert.strictEqual(formatCompact(949999999), '.9B')

      assert.strictEqual(formatCompact(995000000), '1B')
      assert.strictEqual(formatCompact(1000000000), '1B')
      assert.strictEqual(formatCompact(10000000000), '10B')
      assert.strictEqual(formatCompact(99499999999), '99B')

      assert.strictEqual(formatCompact(99500000000), '.1T')
      assert.strictEqual(formatCompact(949999999999), '.9T')
      assert.strictEqual(formatCompact(950000000000), '1T')
      assert.strictEqual(formatCompact(9499999999999), '9T')
      assert.strictEqual(formatCompact(9500000000000), '>9T')
    })
  })

  describe('definitePluraliseList()', function() {
    it('pluralises multiple terms', function() {
      assert.deepStrictEqual(definitePluraliseList([], []), [])
      assert.deepStrictEqual(definitePluraliseList([0], ['a']), [])
      assert.deepStrictEqual(definitePluraliseList([1], ['a']), ['1 a'])
      assert.deepStrictEqual(definitePluraliseList([2], ['a']), ['2 as'])
      assert.deepStrictEqual(definitePluraliseList([1], ['a'], ['aa']), ['1 a'])
      assert.deepStrictEqual(definitePluraliseList([2], ['a'], ['aa']), [
        '2 aa'
      ])

      assert.deepStrictEqual(definitePluraliseList([], []), [])
      assert.deepStrictEqual(definitePluraliseList([0, 1], ['a', 'b']), ['1 b'])
      assert.deepStrictEqual(definitePluraliseList([0, 2], ['a', 'b']), [
        '2 bs'
      ])
      assert.deepStrictEqual(
        definitePluraliseList([0, 2], ['a', 'b'], ['aa', 'bb']),
        ['2 bb']
      )
    })
  })

  describe('toSentence()', function() {
    it('formats sentences', function() {
      assert.strictEqual(toSentence([]), '')
      assert.strictEqual(toSentence(['foo']), 'foo')
      assert.strictEqual(toSentence(['foo', 'bar']), 'foo and bar')
      assert.strictEqual(toSentence(['foo', 'bar', 'baz']), 'foo, bar and baz')
      assert.strictEqual(
        toSentence(['foo', 'bar', 'baz', 'bat']),
        'foo, bar, baz and bat'
      )
    })
  })
})
