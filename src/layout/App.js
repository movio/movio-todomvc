import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './Header';
import todos from '../todos';

const App = (props) => (
  <div>
    <Header add={props.actions.add} />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todos.actions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
