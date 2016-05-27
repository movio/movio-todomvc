import * as React from 'react'
import { Component, FocusEvent } from 'react'

import * as classnames from 'classnames'

import { TextField } from 'material-ui'

class TodoTextInput extends Component<InputProps, InputStates> {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || '',
    }
  }

  handleEnter(e) {
    const { isNew, onSave } = this.props
    const { text } = this.state

    if (e.keyCode === 13) { // on enter
      onSave(text.trim())
      if (isNew) this.setState({ text: '' })
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e: FocusEvent) {
    const { isNew, onSave } = this.props
    const { text } = this.state
    if (!isNew) onSave(text.trim())
  }

  render() {
    const { isNew, editable, style } = this.props

    const classNames = classnames({
      'edit': editable,
      'new-todo': isNew,
    })

    return (
      <TextField
        id={Math.floor(Math.random() * 0x10000).toString()}
        className={classNames}
        style={style}
        type="text"
        hintText={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleEnter.bind(this)}
      />
    );
  }
}

interface InputProps {
  text: string,
  isNew: boolean,
  editable: boolean,
  onSave: (text: string) => void,
  style?: {[key: string]: any},
  placeholder?: string,
}

interface InputStates {
  text: string,
}

export default TodoTextInput;
