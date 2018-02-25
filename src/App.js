import React, {Component} from 'react'
import Header from './components/Header'
import Clock from './components/Clock'
import Pattaya from './components/Pattaya'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Clock />
        <Pattaya />
      </div>
    )
  }
}

export default App
