import * as React from 'react'
import { Component } from 'react';

import { AppBar } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import MyRawTheme from '../material_ui_raw_theme_file';

const muiTheme = getMuiTheme(MyRawTheme)

class App extends Component<AppProps, any> {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title="Movio TODO MVC" />
            {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

interface AppProps {
  children: React.ReactNode[],
}

export default App;
