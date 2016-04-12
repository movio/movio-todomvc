import React, { PropTypes, Component } from 'react'

import { AppBar, Styles } from 'material-ui'
import MyRawTheme from '../src/material_ui_raw_theme_file'

import todos from '../todos'
const { TodoTextInput } = todos

const defaultStyle = {
  marginLeft: 20
}

class Header extends Component {
  static get childContextTypes () {
    return { muiTheme: React.PropTypes.object }
  }

  getChildContext () {
    return { muiTheme: Styles.getMuiTheme(MyRawTheme) }
  }

  handleSave (text) {
    if (text.length !== 0) {
      this.props.add(text)
    }
  }

  render () {
    return (
      <header className='header'>
        <AppBar title='Movio TODO MVC' />
        <h1 style={defaultStyle}>todos</h1>
        <TodoTextInput newTodo onSave={this.handleSave.bind(this)} placeholder='What needs to be done?' />
      </header>
    )
  }
}

Header.propTypes = {
  add: PropTypes.func.isRequired
}

export default Header
