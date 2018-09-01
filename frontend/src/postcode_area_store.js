/* global fetch */

// TODO: generate actual data
import postcodeAreaDataPath from './data/cap_by_area.geo.json'

export default class PostcodeAreaStore {
  constructor() {
    this.data = null
  }

  lookup(postcodeArea) {
    if (!this.data) return null
    const postcodeAreaFeature = this.data.features.find(
      feature => feature.properties.postcodeArea === postcodeArea
    )
    if (!postcodeAreaFeature) {
      throw new Error('postcodeArea not found')
    }
    return postcodeAreaFeature.properties
  }

  load() {
    return fetch(postcodeAreaDataPath, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.status === 200) return response.json()
        throw new Error('postcodeArea data not found')
      })
      .then(data => {
        this.data = data
      })
  }
}
