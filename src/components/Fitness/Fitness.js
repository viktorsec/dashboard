import React, {Component} from 'react'
import cx from 'classnames'
import moment from 'moment'

const NUMBER_OF_SECONDS_IN_DAY = 24 * 60 * 60

export default class Fitness extends Component {
  state = {}

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  roundToPrecision(number, precision) {
    return Math.round(number * precision) / precision
  }

  tick() {
    const startOfDay = moment().startOf('day')
    const secondsSinceStartOfDay = moment().diff(startOfDay, 'seconds')
    const portionOfDayGone = secondsSinceStartOfDay / NUMBER_OF_SECONDS_IN_DAY
    const {numberOfDaysOnKeto, startingWeight, currentWeight} = this.props
    const lostWeight = startingWeight - currentWeight
    const lossPerDay = lostWeight / numberOfDaysOnKeto * 1000
    const lostToday = this.roundToPrecision(portionOfDayGone * lossPerDay, 100)
    this.setState({lostToday})
  }

  render() {
    const {name, numberOfDaysSinceStart, numberOfDaysOnKeto,
      percentageOfDaysOnKeto, startingWeight, currentWeight} = this.props
    const lostKgs = Number.parseFloat(startingWeight - currentWeight).toPrecision(3)
    const onKetoFor = numberOfDaysOnKeto
    const {lostToday} = this.state
    
    return (
      <div className={cx('card', 'mediumcard')}>
        <div className="large">{name}</div>
        <br />
        On keto for {onKetoFor} out of {numberOfDaysSinceStart} days since start.
        That's&nbsp;{percentageOfDaysOnKeto} commitment.<br />
        {lostKgs}kgs lost so far<br />
        Estimated {lostToday}g lost today
      </div>
    )
  }
}
