import React, {Component} from 'react'
import PropTypes from 'prop-types'

export const propTypes = {
}

export const defaultProps = {
}

export default class Pattaya extends Component {
  static propTypes = {
    ...propTypes,
  }

  static defaultProps = {
    ...defaultProps,
  }

  render() {
    return (
      <p>
        Pattaya
      </p>
    )
  }
}
