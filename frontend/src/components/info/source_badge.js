import React from 'react'
import PropTypes from 'prop-types'

const BADGE = {
  cordis: 'Research',
  creative: 'Arts & Culture',
  erasmus: 'Young People',
  esif: 'Jobs & Growth',
  nweurope: 'Jobs & Growth'
}

const SourceBadge = ({ source }) => {
  const title = BADGE[source]
  if (!title) return null
  return <span className="badge badge-info">{title}</span>
}

export default SourceBadge

SourceBadge.propTypes = {
  source: PropTypes.string
}

// TODO bring this text back somewhere
//
// const CordisInfoFooter = () => {
//   return (
//     <p>
//       The European Research Council funds research that saves lives and drives
//       innovation in the UK and across the EU.{' '}
//       <a href="/about" target="_blank">
//         Find out more.
//       </a>
//     </p>
//   )
// }
//
// const CreativeInfoFooter = () => {
//   return (
//     <p>
//       This grant was part of Creative Europe, which is a €1.46 billion European
//       Union programme for the cultural and creative sectors for the years
//       2014-2020.{' '}
//       <a href="/about" target="_blank">
//         Find out more.
//       </a>
//     </p>
//   )
// }
//
// const ErasmusInfoFooter = () => {
//   return (
//     <p>
//       This grant as part of Erasmus+, which helps young people.{' '}
//       <a href="/about" target="_blank">
//         Find out more.
//       </a>
//     </p>
//   )
// }
//
// const EsifInfoFooter = () => {
//   return (
//     <p>
//       The EU supported this project through its European Structural and
//       Investment Funds, which are the EU&apos;s main funding programmes for
//       supporting growth and jobs in the UK and across the EU.{' '}
//       <a href="/about" target="_blank">
//         Find out more.
//       </a>
//     </p>
//   )
// }
//
// const FtsInfoFooter = () => {
//   return (
//     <p>
//       This grant was from the EU budget centrally administered by the Commission{' '}
//       <a href="/about" target="_blank">
//         Find out more.
//       </a>
//     </p>
//   )
// }
