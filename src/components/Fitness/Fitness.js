import React, {Component} from 'react'
import {Weight} from './WeightData'

export default class Fitness extends Component {

  render() {
    const lostKgs = Number.parseFloat(Weight.Innitial - Weight.Current).toPrecision(2)

    return (
      <div className="Module">
        {lostKgs} kgs lost so far
      </div>
    )
  }
}
