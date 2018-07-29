import React from 'react'
import ReactDOM from 'react-dom'

import Map from './map'
import Nav from './nav'

const App = () => {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <Map />
      </div>
    </div>
  )
}
export default App

ReactDOM.render(<App />, document.getElementById('app'))
