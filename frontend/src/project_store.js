/* global fetch */

import districtDataPath from './data/map/output/district'

export default class ProjectStore {
  constructor() {
    this.cache = {}
  }

  lookup(outwardCode, inwardCode) {
    const districtData = this.cache[outwardCode]
    if (!districtData) return null

    const results = []
    const datasets = districtData.datasets
    for (let datasetName in datasets) {
      if (!datasets.hasOwnProperty(datasetName)) continue
      const dataset = datasets[datasetName]
      const columns = dataset.columns
      for (let row of dataset.data) {
        if (row[0] !== inwardCode) continue
        const item = { dataset: datasetName }
        for (let i = 0; i < row.length; ++i) {
          item[columns[i]] = row[i]
        }
        results.push(item)
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
