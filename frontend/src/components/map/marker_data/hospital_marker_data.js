import PostcodeMarkerData from './postcode_marker_data'

import hospitalPostcodePath from '../../../images/hospital_postcode.svg'
import hospitalPostcodeSelectedPath from '../../../images/hospital_postcode_selected.svg'

export default class HospitalMarkerData extends PostcodeMarkerData {
  getIconUrl() {
    return hospitalPostcodePath
  }

  getIconSelectedUrl() {
    return hospitalPostcodeSelectedPath
  }
}
