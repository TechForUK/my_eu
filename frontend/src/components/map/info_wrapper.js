import React from 'react'
import PropTypes from 'prop-types'

import CordisInfo from '../info_windows/cordis_info'
import CreativeInfo from '../info_windows/creative_info'
import EsifInfo from '../info_windows/esif_info'
import FtsInfo from '../info_windows/fts_info'

function makeProjectInfo(data) {
  if (data.dataset === 'esif') {
    return <EsifInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'cordis') {
    return <CordisInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'creative') {
    return <CreativeInfo key={data.myEuId} {...data} />
  } else if (data.dataset === 'fts') {
    return <FtsInfo key={data.myEuId} {...data} />
  } else {
    return <div>TODO</div>
  }
}

const InfoWrapper = ({ postcode, projects }) => {
  let header
  if (projects.length > 1) {
    header = (
      <h2>
        {projects.length} projects at {postcode}
      </h2>
    )
  }
  return (
    <div className="my-eu-info-window">
      {header}
      {projects.map(makeProjectInfo)}
    </div>
  )
}

InfoWrapper.propTypes = {
  postcode: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object)
}

export default InfoWrapper
