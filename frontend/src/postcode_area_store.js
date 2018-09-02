/* global fetch */

import postcodeAreaDataPath from './data/map/output/postcode_areas.data.json'
import { extractPostcodeArea } from './utilities'

function convertSplitRowToRecord(columns, row, skipIndex = -1) {
  const record = {}
  for (let i = 0; i < columns.length; ++i) {
    if (i === skipIndex) continue
    record[columns[i]] = row[i]
  }
  return record
}

function convertSplitRowsToRecords(columns, data, skipIndex = -1) {
  return data.map(row => convertSplitRowToRecord(columns, row, skipIndex))
}

function parseStartAndEndDates(record) {
  const MS_PER_S = 1e3
  record.start_date = new Date(record.start_date * MS_PER_S)
  record.end_date = new Date(record.end_date * MS_PER_S)
  return record
}

export default class PostcodeAreaStore {
  constructor() {
    this.data = null
  }

  lookup(postcodeArea) {
    if (!this.data) return null

    const name = this._lookupName(postcodeArea)
    if (!name) throw new Error('postcode area not found')

    const totalAmounts = this._lookupTotalAmounts(postcodeArea)
    const counts = this._lookupCounts(postcodeArea)
    const cap = this._lookupCap(postcodeArea)
    const cordis = this._lookupProjects(postcodeArea, 'cordis')
    const creative = this._lookupProjects(postcodeArea, 'creative')
    const esif = this._lookupProjects(postcodeArea, 'esif')

    return {
      postcodeArea,
      name,
      totalAmounts,
      counts,
      cap,
      cordis,
      creative,
      esif
    }
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

  _lookupName(postcodeArea) {
    const areas = this.data.areas
    const postcodeAreaIndex = areas.columns.indexOf('postcode_area')
    const postcodeAreaNameIndex = areas.columns.indexOf('postcode_area_name')
    const areaRow = areas.data.find(
      row => row[postcodeAreaIndex] === postcodeArea
    )
    return areaRow && areaRow[postcodeAreaNameIndex]
  }

  _lookupTotalAmounts(postcodeArea) {
    const totals = this.data.totals
    const postcodeAreaIndex = totals.columns.indexOf('postcode_area')
    return convertSplitRowsToRecords(
      totals.columns,
      totals.data.filter(row => row[postcodeAreaIndex] === postcodeArea),
      postcodeAreaIndex
    )
  }

  _lookupCounts(postcodeArea) {
    const counts = this.data.counts
    const postcodeAreaIndex = counts.columns.indexOf('postcode_area')
    return convertSplitRowsToRecords(
      counts.columns,
      counts.data.filter(row => row[postcodeAreaIndex] === postcodeArea),
      postcodeAreaIndex
    )
  }

  _lookupCap(postcodeArea) {
    const cap = this.data.cap
    const postcodeAreaIndex = cap.columns.indexOf('postcode_area')
    return convertSplitRowsToRecords(
      cap.columns,
      cap.data.filter(row => row[postcodeAreaIndex] === postcodeArea),
      postcodeAreaIndex
    )
  }

  _lookupProjects(postcodeArea, kind) {
    const projects = this.data[kind]
    if (!projects) return []
    const postcodeIndex = projects.columns.indexOf('postcode')
    return convertSplitRowsToRecords(
      projects.columns,
      projects.data.filter(
        row => extractPostcodeArea(row[postcodeIndex]) === postcodeArea
      )
    ).map(parseStartAndEndDates)
  }
}
