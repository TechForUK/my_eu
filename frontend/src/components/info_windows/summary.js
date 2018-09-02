import React from 'react'
import PropTypes from 'prop-types'

const MAX_WORDS = 50

class Summary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: true
    }

    this.showMore = this.showMore.bind(this)
    this.showLess = this.showLess.bind(this)
  }

  render() {
    let text = this.props.text
    let expander
    let collapser

    if (this.state.collapsed) {
      const words = text.split(' ')
      if (words.length > MAX_WORDS) {
        text = words.slice(0, MAX_WORDS).join(' ')

        expander = (
          <span>
            &hellip;{' '}
            <a href="#" onClick={this.showMore}>
              Show More
            </a>
          </span>
        )
      }
    } else {
      collapser = (
        <p>
          <a href="#" onClick={this.showLess}>
            Show Less
          </a>
        </p>
      )
    }

    return (
      <React.Fragment>
        <p style={{ whiteSpace: 'pre-wrap' }}>
          {text}
          {expander}
        </p>
        {collapser}
      </React.Fragment>
    )
  }

  showMore(event) {
    event.preventDefault()
    this.setState({ collapsed: false })
  }

  showLess(event) {
    event.preventDefault()
    this.setState({ collapsed: true })
  }
}

Summary.propTypes = {
  text: PropTypes.string
}

export default Summary
