const WHITE = '#fcfcfc'

export const ZOOMED_OUT_STYLE = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: WHITE }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { hue: '#5f94ff' }, { lightness: 60 }]
  }
]

export const ZOOMED_IN_STYLE = []
