/* global fetch */
import queryString from 'query-string'

import postcodeAreaNames from './data/postcodes/output/postcode_area_names'

export function formatRoundPercentage(fraction) {
  return fraction.toLocaleString('en-GB', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export function formatRoundPounds(pounds) {
  return pounds.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export function extractPostcodeArea(postcode) {
  const area = /^[A-Z]{1,2}/.exec(postcode)
  return area && area[0]
}

// Strings like "around Watford" and "in North London".
export function getPrepositionAreaName(postcodeArea) {
  const aroundName = postcodeAreaNames[postcodeArea]
  if (!aroundName) return
  const [preposition, name] = aroundName
  return `${preposition} ${name}`
}

export function getSearchQuery(location) {
  if (location.search) return decodeURIComponent(location.search.slice(1))
  return ''
}

// Print a number using at most 4 letters.
export function formatSemiCompact(n) {
  n = Number(n.toPrecision(2))
  if (n < 1e3) return n.toString()
  let r = Math.round(n / 1e3)
  if (r < 1000) return r + 'K'
  r = Math.round(n / 1e6)
  if (r < 1000) return r + 'M'
  r = Math.round(n / 1e9)
  if (r < 1000) return r + 'B'
  return '>1T'
}

export function formatSemiCompactPounds(x) {
  return `£${formatSemiCompact(x)}`
}

// Print a number up to 9 trillion in at most 3 letters.
export function formatCompact(n) {
  if (n < 1e3) return n.toString()
  let r = Math.round(n / 1e3)
  if (r < 100) return r + 'K'
  r = Math.round(n / 1e5)
  if (r < 10) return '.' + r + 'M'
  r = Math.round(n / 1e6)
  if (r < 100) return r + 'M'
  r = Math.round(n / 1e8)
  if (r < 10) return '.' + r + 'B'
  r = Math.round(n / 1e9)
  if (r < 100) return r + 'B'
  r = Math.round(n / 1e11)
  if (r < 10) return '.' + r + 'T'
  r = Math.round(n / 1e12)
  if (r < 10) return r + 'T'
  return '>9T'
}

export function sum(xs) {
  let total = 0
  for (let x of xs) total += x
  return total
}

export function indefinitePluralise(n, noun, limit = 1, plural = `${noun}s`) {
  if (n <= limit) return plural
  return `${n} ${plural}`
}

export function definitePluralise(n, noun, plural = `${noun}s`) {
  if (n === 1) return `${n} ${noun}`
  return `${n} ${plural}`
}

export function definitePluraliseList(ns, nouns, plurals = []) {
  return ns
    .map((n, i) => {
      if (n > 0) return definitePluralise(n, nouns[i], plurals[i])
    })
    .filter(Boolean)
}

export function toSentence(words) {
  if (words.length === 0) return ''
  if (words.length === 1) return words[0]
  if (words.length === 2) return `${words[0]} and ${words[1]}`
  return (
    words.slice(0, words.length - 1).join(', ') +
    ` and ${words[words.length - 1]}`
  )
}

// From https://stackoverflow.com/a/49857905/2053820
export function fetchWithTimeout(url, options, timeout) {
  return Promise.race([
    fetch(url, options),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ])
}

export function convertSplitRowToRecord(columns, row, skipIndex = -1) {
  const record = {}
  for (let i = 0; i < columns.length; ++i) {
    if (i === skipIndex) continue
    record[columns[i]] = row[i]
  }
  return record
}

export function convertSplitRowsToRecords(columns, data, skipIndex = -1) {
  return data.map(row => convertSplitRowToRecord(columns, row, skipIndex))
}

export function formatYearRange(startDate, endDate) {
  const startYear = startDate.getFullYear()
  const endYear = endDate.getFullYear()
  return endYear > startYear ? `${startYear}–${endYear}` : `${startYear}`
}

export function isBeta() {
  return 'beta' in queryString.parse(window.location.search)
}
