import React, {Component} from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

export const propTypes = {
}

export const defaultProps = {
}

export default class Header extends Component {
  static propTypes = {
    ...propTypes,
  }

  static defaultProps = {
    ...defaultProps,
  }

  render() {
    return (
      <h1 className={cx('huge', 'purpleLabel')}>
        Ružinovský Habitat
      </h1>
    )
  }
}
