import MarkerData from '.'

import signMarkerPath from '../../../images/sign_marker.svg'
import signMarkerSelectedPath from '../../../images/sign_marker_selected.svg'

export default class SignMarkerData extends MarkerData {
  constructor(position, id) {
    super(0, position)

    this.id = id
  }

  getIconUrl() {
    return signMarkerPath
  }

  getIconSelectedUrl() {
    return signMarkerSelectedPath
  }
}
