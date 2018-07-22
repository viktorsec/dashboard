import React, {Component} from 'react'
import cx from 'classnames'
import {getCurrentWeather, getForecastWeather} from './../../services/xuApi'

const TEN_MINUTES = 10 * 60 * 1000

export default class Weather extends Component {
  state = {}

  componentDidMount() {
    this.tick()
    this.interval = setInterval(this.tick.bind(this), TEN_MINUTES)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    const {location, showForecast, showCurrent} = this.props

    const currentPromise = getCurrentWeather(location)
    showCurrent && currentPromise.then((data) => {
      const {current} = data
      this.setState({current});
    })

    const forecastPromise = getForecastWeather(location)
    showForecast && forecastPromise.then((data) => {
      const {forecast} = data
      this.setState({forecast});
    })
  }

  render() {
    const {current, forecast} = this.state
    const {showCurrent, showForecast, location} = this.props
    console.log("state", this.state)

    if (showCurrent && current) {
      const {temp_c} = current
      const text = current.condition.text
 
      return (
        <div className="Module">
          <div className="extralarge">{temp_c}°C</div>
          <div className="">
            <div>{location}</div>
            <div>{text}</div>
          </div>
        </div>
      )
    }

    return null
  }
}
