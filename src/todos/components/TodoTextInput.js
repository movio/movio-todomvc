import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { TextField } from 'material-ui';

const defaultStyle = {
  marginLeft: 20,
};

class TodoTextInput extends Component {
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
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleEnter}
      />
    );
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
};

export default TodoTextInput;
