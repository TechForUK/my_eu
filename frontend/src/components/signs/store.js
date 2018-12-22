/* global fetch */

import { convertSplitRowsToRecords, isBeta } from '../../utilities'

export default class SignsStore {
  constructor() {
    this.signs = null
    this.loadData = this._loadData().then(({ columns, data }) => {
      this.signs = convertSplitRowsToRecords(columns, data)
      return this.signs
    })
  }

  _loadData() {
    const columns = ['id', 'latitude', 'longitude', 'title']
    if (!isBeta())
      return new Promise((resolve, reject) => {
        resolve({ columns, data: [] })
      })

    if (process.env.NODE_ENV === 'production') {
      return this._loadProductionData()
    } else {
      return new Promise((resolve, reject) => {
        resolve(
          JSON.parse(
            '{"columns":["id","latitude","longitude","title"],"data":[["a30bfc84-a0e8-466e-abd9-f49629cd7256",51.490863,-0.135892,"Test Title 1"],["f20b9379-19ce-4a43-9e0b-6bc1367df1bc",51.480342,-0.156713,"Test Title 2"]]}'
          )
        )
      })
    }
  }

  _loadProductionData() {
    return fetch('https://www.myeu.uk/signs.json', {
      credentials: 'same-origin'
    }).then(response => response.json())
  }

  findSignById(signId) {
    if (!this.signs) return null
    return this.signs.find(sign => sign.id === signId)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SignsStore()
    }
    return this.instance
  }
}
