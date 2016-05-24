import * as React from 'react'
import { Component } from 'react';

import { getMuiTheme } from 'material-ui/styles';
import MyRawTheme from '../material_ui_raw_theme_file';

import { AppBar } from 'material-ui';

interface AppContext {
  muiTheme: any
}

class App extends Component<AppProps, any> {

  static childContextTypes = {
    muiTheme:  React.PropTypes.object
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(MyRawTheme) }
  }

  render() {
    return (
      <div>
        <AppBar title="Movio TODO MVC" />
        {this.props.children}
      </div>
    );
  }
}

interface AppProps {
  children: React.ReactNode[],
}

export default App;
