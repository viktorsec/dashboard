import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import _ from 'lodash'
import Header from './components/Header/Header'
import Blockchain from './components/Blockchain/Blockchain'
import Clock from './components/Clock/Clock'
import Fitness from './components/Fitness/Fitness'
import Weather from './components/Weather/Weather'
import Pattaya from './components/Pattaya/Pattaya'
import {getSheetData} from './services/googleSpreadsheetApi.jsx'
import './App.css'

class App extends Component {

  state = {
    googleSheetData: null,
  }

  componentDidMount() {
    getSheetData().then((data) => this.setState({googleSheetData: data}))
  }

  render() {
    const fitnessKeys = ['numberOfDaysSinceStart', 'numberOfDaysOnKeto',
      'percentageOfDaysOnKeto', 'startingWeight', 'currentWeight']

    const fitnessProps = _.pick(this.state.googleSheetData, fitnessKeys)
    return (
      <div className="app">
        <Grid>
          <Row>
            <Header />
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Clock />
              <Pattaya />
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
              <Blockchain currency="bitcoin" />
            </Col>
            <Col xs={6} md={4}>
              <Blockchain currency="ethereum" />
            </Col>
            <Col xs={6} md={4}>
              <Blockchain currency="dogecoin" />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
