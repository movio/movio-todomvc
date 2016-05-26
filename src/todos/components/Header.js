import React, { PropTypes, Component } from 'react';

import TodoTextInput from './TodoTextInput';

const defaultStyle = {
  marginLeft: 20,
};

class Header extends Component {
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
          newTodo={true}
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

Header.propTypes = {
  add: PropTypes.func.isRequired,
};

export default Header;
