import React, {Component} from 'react'
import cx from 'classnames'
import {Weight, Keto} from './Data'
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
    const lostToday = this.roundToPrecision(portionOfDayGone * Weight.LossPerDay, 100)
    this.setState({lostToday})
  }

  render() {
    const {name} = this.props
    const lostKgs = Number.parseFloat(Weight.Innitial - Weight.Current).toPrecision(2)
    const onKetoFor = moment().diff(Keto.Start, 'days') + 1
    const {lostToday} = this.state
    
    return (
      <div className={cx('card', 'mediumcard')}>
        <div className="large">{name}</div>
        <br />
        On keto for {onKetoFor} days<br />
        {lostKgs}kgs lost so far<br />
        Estimated {lostToday}g lost today
      </div>
    )
  }
}
