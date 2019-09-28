import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import _ from 'lodash'
import Header from './components/Header/Header'
import Blockchain from './components/Blockchain/Blockchain'
import Business from './components/Business/Business'
import Clock from './components/Clock/Clock'
import Fitness from './components/Fitness/Fitness'
import Flipbook from './components/Flipbook/Flipbook'
import Stocks from './components/Stocks/Stocks'
import Weather from './components/Weather/Weather'
import {getSheetData} from './services/googleSpreadsheetApi.jsx'
import './App.css'

class App extends Component {

  state = {
    googleSheetData: {
      numberOfDaysSinceStart: 0,
      numberOfDaysOnKeto: 0,
      percentageOfDaysOnKeto: 0,
      startingWeight: 0,
      currentWeight: 0,
      AMZN: 0,
      AMZNChange: 0,
      BYND: 0,
      BYNDChange: 0,
      AAPL: 0,
      AAPLChange: 0,
      ATVI: 0,
      ATVIChange: 0,
      TSLA: 0,
      TSLAChange: 0,
      CRBN: 0,
      CRBNChange: 0,
    },
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 60 * 1000)
    this.tick()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    getSheetData().then((data) => this.setState({googleSheetData: data}))
  }

  render() {
    const {googleSheetData} = this.state
    const fitnessKeys = ['numberOfDaysSinceStart', 'numberOfDaysOnKeto',
      'percentageOfDaysOnKeto', 'startingWeight', 'currentWeight']

    const fitnessProps = _.pick(googleSheetData, fitnessKeys)

    const {AMZN, AMZNChange, BYND, BYNDChange,
      AAPL, AAPLChange, ATVI, ATVIChange, TSLA,
      TSLAChange, CRBN, CRBNChange} = googleSheetData
    return (
      <div className="app">
        <Grid>
          <Row>
            <Header />
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Clock />
              <Business business="pattaya" />
            </Col>
            <Col xs={6} md={4}>
              <Fitness
                {...fitnessProps}
                name="Viktor"
              />
            </Col>
            <Col xs={6} md={4}>
              <Weather location="Bratislava" showCurrent />
              <Weather location="Vienna" showCurrent />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Flipbook>
                <Blockchain currency="bitcoin" />
                <Blockchain currency="ethereum" />
                <Blockchain currency="dogecoin" />
              </Flipbook>
            </Col>
            <Col xs={6} md={4}>
              <Stocks
                symbol="AMZN"
                price={AMZN}
                dailyChange={AMZNChange}
              />
              <Stocks
                symbol="BYND"
                price={BYND}
                dailyChange={BYNDChange}
              />
              <Stocks
                symbol="AAPL"
                price={AAPL}
                dailyChange={AAPLChange}
              />
            </Col>
            <Col xs={6} md={4}>
              <Stocks
                symbol="ATVI"
                price={ATVI}
                dailyChange={ATVIChange}
              />
              <Stocks
                symbol="TSLA"
                price={TSLA}
                dailyChange={TSLAChange}
              />
              <Stocks
                symbol="CRBN"
                price={CRBN}
                dailyChange={CRBNChange}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
