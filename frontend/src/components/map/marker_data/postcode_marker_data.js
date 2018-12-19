import MarkerData from '.'

export default class PostcodeMarkerData extends MarkerData {
  constructor(amount, position, outwardCode, inwardCode) {
    super(amount, position)

    this.outwardCode = outwardCode
    this.inwardCode = inwardCode
  }
}
