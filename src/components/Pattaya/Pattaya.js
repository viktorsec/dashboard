import React, {Component} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {BusinessHours} from './BusinessHours'

export const propTypes = {
}

export const defaultProps = {
}

export default class Pattaya extends Component {
  static propTypes = {
    ...propTypes,
  }

  static defaultProps = {
    ...defaultProps,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: null,
      nextStateChange: 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    // TODO fix Sunday
    const now = moment()
    const currentDay = now.format('dddd')
    const opensAt = moment(BusinessHours[currentDay].opensAt, 'H:mm')
    const closesAt = moment(BusinessHours[currentDay].closesAt, 'H:mm')

    if (now.isBetween(opensAt, closesAt)) {
      const nextStateChange = moment(closesAt.diff(now)).format('H:mm:ss')
      this.setState({
        isOpen: true,
        nextStateChange,
      })
    } else {
      const tomorrowDay = moment().add(1, 'day').format('dddd')
      const tomorrowOpensAt = moment(BusinessHours[tomorrowDay].opensAt, 'H:mm').add(1, 'day')
      const nextStateChange = moment(tomorrowOpensAt.diff(now)).format('H:mm:ss')
      this.setState({
        isOpen: false,
        nextStateChange,
      })
    }
  }

  renderStatus() {
    const {isOpen, nextStateChange} = this.state
    return (
      <div>
        {isOpen === true
          && <div>
            <div className="greenLabel">OPEN</div>
            <div>Closes in {nextStateChange}</div>
          </div>
        }
        {isOpen === false
          && <div>
            <div className="redLabel">CLOSED</div>
            <div>Opens in {nextStateChange}</div>
          </div>
        }
      </div>
    )
  }

  render() {
    return (
      <div className="Module">
        Pattaya
        {this.renderStatus()}
      </div>
    )
  }
}
