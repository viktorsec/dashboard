import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import Header from './components/Header/Header'
import Blockchain from './components/Blockchain/Blockchain'
import Clock from './components/Clock/Clock'
import Weather from './components/Weather/Weather'
import Pattaya from './components/Pattaya/Pattaya'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Header />
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Clock />
            </Col>
            <Col xs={6} md={4}>
              <Pattaya />
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
