import React, { PropTypes, Component } from 'react';

import { AppBar } from 'material-ui';
import { getMuiTheme } from 'material-ui/styles';

import MyRawTheme from '../material_ui_raw_theme_file';

import todos from '../todos';
const { TodoTextInput } = todos;

const defaultStyle = {
  marginLeft: 20,
};

class Header extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  constructor(props, context) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(MyRawTheme) };
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.add(text);
    }
  }

  render() {
    return (
      <header className="header">
        <AppBar title="Movio TODO MVC" />
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

Header.propTypes = {
  add: PropTypes.func.isRequired,
};

export default Header;
