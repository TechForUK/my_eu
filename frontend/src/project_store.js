/* global fetch */

import districtDataPath from './data/map/output/district'
import districtColumns from './data/map/output/district_columns'
import { convertSplitRowsToRecords } from './utilities'

function parseStartAndEndDates(record) {
  record.startDate = new Date(record.startDate)
  record.endDate = new Date(record.endDate)
  return record
}

export default class ProjectStore {
  constructor() {
    this.cache = {}
  }

  lookup(outwardCode, inwardCode) {
    const districtData = this.cache[outwardCode]
    if (!districtData) return null

    const results = {}
    const datasets = districtData.postcodes[inwardCode]
    for (let datasetName in datasets) {
      if (!datasets.hasOwnProperty(datasetName)) continue
      const dataset = datasets[datasetName]
      results[datasetName] = {
        data: convertSplitRowsToRecords(
          districtColumns[datasetName],
          dataset.data
        ).map(parseStartAndEndDates),
        extra: dataset.extra
      }
    }
    return results
  }

  load(outwardCode) {
    return fetch(districtDataPath[outwardCode], {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.status === 200) return response.json()
        throw new Error('outwardCode not found')
      })
      .then(data => {
        this.cache[outwardCode] = data
      })
  }
}
