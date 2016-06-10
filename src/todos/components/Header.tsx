import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import TodoTextInput from './TodoTextInput'
import { addTodo } from '../actions'

class Header extends Component<HeaderProps, any> {
  constructor(props, context) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          text=""
          style={{ width: '100%' }}
          isNew={true}
          editable={true}
          onSave={this.handleSave.bind(this)}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

interface HeaderProps {
  addTodo: (text: string) => void
}

export default connect(undefined, {
  addTodo
})(Header)
