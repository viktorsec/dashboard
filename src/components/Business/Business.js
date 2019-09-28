import React, {Component} from 'react'
import moment from 'moment'
import cx from 'classnames'
import PropTypes from 'prop-types'
import {data} from './Data'

export const propTypes = {
  business: PropTypes.string,

}

export const defaultProps = {
  business: "",
}

export default class BusinessHours extends Component {
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
    const {business} = this.props
    const businessHours = data[business]

    if (!businessHours) {
      return null
    }

    // TODO fix Sunday
    const now = moment()
    const currentDay = now.format('dddd')
    const opensAt = moment(businessHours[currentDay].opensAt, 'H:mm')
    const closesAt = moment(businessHours[currentDay].closesAt, 'H:mm')

    if (now.isBetween(opensAt, closesAt)) {
      const nextStateChange = moment(closesAt.diff(now)).format('H:mm:ss')
      this.setState({
        isOpen: true,
        nextStateChange,
      })
    } else {
      const tomorrowDay = moment().add(1, 'day').format('dddd')
      const tomorrowOpensAt = moment(businessHours[tomorrowDay].opensAt, 'H:mm').add(1, 'day')
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
    const {business} = this.props
    const businessData = data[business]

    if (!businessData) {
      return null
    }

    const {label} = businessData

    return (
      <div className={cx('card', 'smallcard')}>
        <div className="large">{label}</div>
        {this.renderStatus()}
      </div>
    )
  }
}
