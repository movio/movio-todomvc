import * as React from 'react'
import { Component } from 'react';
import * as classnames from 'classnames';
import { TextField } from 'material-ui';

const defaultStyle = {
  marginLeft: 20,
};

class TodoTextInput extends Component<TodoTextInputProps, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEnter(e) {
    if (e.keyCode === 13) { // on enter
      const text = e.target.value.trim();
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    return (
      <TextField
        className={classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo,
        })}
        style={defaultStyle}
        type="text"
        hintText={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleEnter}
      />
    );
  }
}

interface TodoTextInputProps {
  onSave: Function,
  text?: string,
  placeholder?: string,
  editing?: boolean,
  newTodo?: boolean,
}

export default TodoTextInput;
