export function formatRoundPercentage(fraction) {
  return fraction.toLocaleString('en-GB', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export function formatRoundEuros(euros) {
  return euros.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
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
