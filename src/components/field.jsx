import React from 'react'

export default class FieldStyle extends React.Component {
  componentDidMount () {
    this.ref && this.ref.focus()
  }

  render () {
    const {autoFocus, original, valueChange, value, ...rest} = this.props;
    const ref = autoFocus ? (ref) => { this.ref = ref } : null
    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={valueChange}
        {...rest}
      />
    )
  }
}