import React, {Component} from 'react'
import moment from 'moment'
import cx from 'classnames'

export default class Clock extends Component {

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
      <div className={cx('Module', 'extralarge')}>
        {this.state.timeString}
      </div>
    )
  }
}
