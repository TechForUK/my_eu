/* global fetch */

import postcodeAreaDataPath from './data/map/output/postcode_areas.data.json'
import { extractPostcodeArea } from './utilities'

function convertSplitRowsToRecords(columns, data, skipIndex = -1) {
  return data.map(row => {
    const result = {}
    for (let i = 0; i < columns.length; ++i) {
      if (i === skipIndex) continue
      result[columns[i]] = row[i]
    }
    return result
  })
}

function parseStartAndEndDates(record) {
  const MS_PER_S = 1e3
  record.startDate = new Date(record.start_date * MS_PER_S)
  delete record.start_date
  record.endDate = new Date(record.end_date * MS_PER_S)
  delete record.end_date
  return record
}

export default class PostcodeAreaStore {
  constructor() {
    this.data = null
  }

  lookupTotalAmounts(postcodeArea) {
    if (!this.data) return null
    const totals = this.data.totals
    const postcodeAreaIndex = totals.columns.indexOf('postcode_area')
    return convertSplitRowsToRecords(
      totals.columns,
      totals.data.filter(row => row[postcodeAreaIndex] === postcodeArea),
      postcodeAreaIndex
    )
  }

  lookupProjects(postcodeArea, kind) {
    if (!this.data) return null
    const projects = this.data[kind]
    if (!projects) return null
    const postcodeIndex = projects.columns.indexOf('postcode')
    return convertSplitRowsToRecords(
      projects.columns,
      projects.data.filter(
        row => extractPostcodeArea(row[postcodeIndex]) === postcodeArea
      )
    ).map(parseStartAndEndDates)
  }

  lookup(postcodeArea) {
    if (!this.data) return null

    const totalAmounts = this.lookupTotalAmounts(postcodeArea)
    if (!totalAmounts.length) return null

    const cordis = this.lookupProjects(postcodeArea, 'cordis')
    const creative = this.lookupProjects(postcodeArea, 'creative')
    const esif = this.lookupProjects(postcodeArea, 'esif')

    return { totalAmounts, cordis, creative, esif }
  }

  load() {
    return fetch(postcodeAreaDataPath, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.status === 200) return response.json()
        throw new Error('postcode area data not found')
      })
      .then(data => {
        this.data = data
      })
  }
}
