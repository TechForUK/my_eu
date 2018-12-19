export default class MarkerData {
  constructor(amount, position) {
    this.amount = amount
    this.position = position
  }

  getIconUrl() {
    throw new Error('not implemented')
  }

  getIconSelectedUrl() {
    throw new Error('not implemented')
  }
}
