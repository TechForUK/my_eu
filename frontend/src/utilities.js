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
