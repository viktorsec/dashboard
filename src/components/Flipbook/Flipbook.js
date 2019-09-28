import React, {Component, Fragment} from 'react'

export default class Flipbook extends Component {

  state = {
    currentSlide: 0
  }

  componentDidMount() {
    const {interval} = this.props
    this.interval = setInterval(this.tick.bind(this), interval)
    this.tick()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    const {currentSlide} = this.state
    const {children} = this.props
    const slideCount = React.Children.count(children)
    const nextSlide = (currentSlide + 1) % slideCount
    this.setState({currentSlide: nextSlide})
  }

  setClass(child, i) {
    const {currentSlide} = this.state
    const className = i === currentSlide
      ? ''
      : 'hidden'

    return (
      <div className={className}>
        {child}
      </div>
    )
  }

  render() {
    const {children} = this.props
    const childrenArray = React.Children.toArray(children);

    const toRender = childrenArray.map((child, i) => {
      return this.setClass(child, i)
    })

    return (
      <Fragment>
        {toRender}
      </Fragment>
    )
  }
}