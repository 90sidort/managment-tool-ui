import React from 'react'
import Field from './field.jsx'

export default class EditableContainer extends React.Component {
  constructor (props) {
    super(props)
    this.count = 0
    this.state = {
      edit: false,
      value: this.props.original,
    }
    this.valueChange = this.valueChange.bind(this);
  }

  componentWillUnmount () {
    if (this.timeout) clearTimeout(this.timeout)
  }

  valueChange(e) {
    this.setState({value: e.target.value})
  }

  handleClick (e) {
    if (this.timeout) clearTimeout(this.timeout)
    this.count++
    this.timeout = setTimeout(() => {
      if (this.count === 2) {
        this.setState({
          edit: true,
        })
      }
      this.count = 0
    }, 250)
  }

  handleBlur (e) {
    const { id, updateskill } = this.props;
    const { value } = this.state;
    updateskill(id, value)
    this.setState({
      edit: false,
    })
  }

  render () {
    const { children, original, id } = this.props;
    const { edit, value } = this.state;
    if (edit) {
      return (
        <Field
          autoFocus
          original={original}
          valueChange={this.valueChange}
          value={value}
          onBlur={this.handleBlur.bind(this)}
        />
      )
    } else {
      return (
        <span
          onClick={this.handleClick.bind(this)}
          id={id}
        >
          {children}
        </span>
      )
    }
  }
}