import React, {Component} from 'react'
import Header from './components/Header/Header'
import Clock from './components/Clock/Clock'
import Pattaya from './components/Pattaya/Pattaya'
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
