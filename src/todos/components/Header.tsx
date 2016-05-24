import * as React from 'react'
import { Component } from 'react';

import TodoTextInput from './TodoTextInput';

const defaultStyle = {
  marginLeft: 20,
};

class Header extends Component<HeaderProps, any> {
  constructor(props, context) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.add(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1 style={defaultStyle}>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

interface HeaderProps {
  add: Function
}

export default Header;
