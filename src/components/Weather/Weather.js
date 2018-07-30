import React, {Component} from 'react'
import cx from 'classnames'
import {getCurrentWeather, getForecastWeather} from './../../services/xuApi'

const TEN_MINUTES = 10 * 60 * 1000
const EXTREME_HEAT_BOUNDARY = 28
const EXTREME_COLD_BOUNDARY = 4

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
      this.setState({current})
    })

    const forecastPromise = getForecastWeather(location)
    showForecast && forecastPromise.then((data) => {
      const {forecast} = data
      this.setState({forecast})
    })
  }

  render() {
    const {current, forecast} = this.state
    const {showCurrent, showForecast, location} = this.props
    console.log("state", this.state)

    if (showCurrent && current) {
      const temperature = current.temp_c
      const text = current.condition.text

      const isExtremeHeat = temperature >= EXTREME_HEAT_BOUNDARY
      const isExtremeCold = temperature <= EXTREME_COLD_BOUNDARY
      const temperatureLabel = {redLabel: isExtremeHeat, blueLabel: isExtremeCold}
      const temperatureClassName = cx('extralarge', temperatureLabel)
 
      return (
        <div className="Module">
          <div className={temperatureClassName}>{temperature}°C</div>
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
