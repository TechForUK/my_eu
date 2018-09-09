import ReactGA from 'react-ga'

window.addEventListener('error', function(event) {
  const location = `${event.filename}:${event.lineno}:${event.colno}`
  const exDescription = `${event.message} @ ${location}`
  ReactGA.ga('send', 'exception', { exDescription })
})
