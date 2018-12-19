import PostcodeMarkerData from './postcode_marker_data'

import fundingPostcodePath from '../../../images/funding_postcode.svg'
import fundingPostcodeSelectedPath from '../../../images/funding_postcode_selected.svg'

export default class FundingMarkerData extends PostcodeMarkerData {
  getIconUrl() {
    return fundingPostcodePath
  }

  getIconSelectedUrl() {
    return fundingPostcodeSelectedPath
  }
}
