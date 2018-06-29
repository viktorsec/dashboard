import React, {Component} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

export const propTypes = {
}

export const defaultProps = {
}

export default class Clock extends Component {
  static propTypes = {
    ...propTypes,
  }

  static defaultProps = {
    ...defaultProps,
  }

  constructor(props) {
    super(props)
    this.state = {
      timeString: this.generateTimeString(),
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  generateTimeString() {
    return moment().format('HH:mm:ss')
  }

  tick() {
    this.setState({timeString: this.generateTimeString()})
  }

  render() {
    return (
      <div className="Module">
        {this.state.timeString}
      </div>
    )
  }
}
