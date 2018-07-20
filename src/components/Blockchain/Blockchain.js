import React, {Component} from 'react'
import cx from 'classnames'
import './Style.css'

export default class Blockchain extends Component {

  state = {}

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    const {currency} = this.props
    fetch(`https://api.coinmarketcap.com/v1/ticker/${currency}/`)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        this.setState({data: responseJson[0]})
      })
  }

  renderChange(change) {
    const className = change >= 0
      ? 'greenLabel'
      : 'redLabel'
    return (
      <div className={className}>{change}%</div>
    )
  }

  render() {
    const {data} = this.state

    if (data === undefined) {return null}

    const name = data.name
    const priceUsd = Math.round(data.price_usd * 1000) / 1000
    const marketCap = Math.round(data.market_cap_usd)
    const change1h = data.percent_change_1h
    const change24h = data.percent_change_24h
    const change7d = data.percent_change_7d
    const priceClassName = change1h >= 0
      ? 'greenLabel'
      : 'redLabel'

    return (
      <div className="Module">
        <div style={{padding: '10px'}}>
          <div className="large">{name}</div>
          <div className={cx('large', priceClassName)}>${priceUsd}</div>
        </div>
        1h change {this.renderChange(change1h)}<br />
        24h change {this.renderChange(change24h)}<br />
        7d change {this.renderChange(change7d)}<br />
        Marketcap <div>${marketCap}</div>
      </div>
    )
  }
}
