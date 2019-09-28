import React, {Component} from 'react'
import moment from 'moment'
import cx from 'classnames'

export default class Clock extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeString: this.generateTimeString(),
      dateString: this.generateDateString(),
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

  generateDateString() {
    return moment().format('ddd Do MMM')
  }

  tick() {
    this.setState({timeString: this.generateTimeString()})
    this.setState({dateString: this.generateDateString()})
  }


  render() {
    return (
      <div className={cx('card', 'smallcard')}>
        <div className="extralarge">{this.state.timeString}</div>
        <div className="medium">{this.state.dateString}</div>
      </div>
    )
  }
}
