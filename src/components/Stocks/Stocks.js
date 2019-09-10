import React, {Component} from 'react'
import cx from 'classnames'
import './Style.css'

export default class Stocks extends Component {

  state = {}

  renderChange(change) {
    const className = change >= 0
      ? 'greenLabel'
      : 'redLabel'
    return (
      <div className={className}>{change}%</div>
    )
  }

  render() {
    const {symbol, price, dailyChange} = this.props
    const previousPrice = (price - dailyChange)
    const dailyPercentChange = parseFloat(dailyChange / previousPrice * 100).toFixed(2)
    const dailyChangeSign = dailyChange >= 0
      ? '+'
      : '-'
    const triangleSymbol = dailyChange >= 0
      ? '▲'
      : '▼'
    const priceClassName = dailyChange >= 0
      ? 'greenLabel'
      : 'redLabel'

    return (
      <div className={cx('card', 'smallcard')}>
        <div className="columns">
          <div className={cx('large', 'sideColumn')}>{symbol}</div>
          <div className="middleColumn">
            <div className={cx('large', priceClassName)}>${price}</div>
            <div className={cx('silentLabel', 'small', 'flex:1 1 auto;')}>
              {dailyChangeSign}${Math.abs(dailyChange)} ({dailyPercentChange}%)
            </div>
          </div>
          <div className={cx('sideColumn', priceClassName, 'medium')}>
            {triangleSymbol}<br />
            DAY
          </div>
        </div>
      </div>
    )
  }
}
