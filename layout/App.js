import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './Header'
import MainSection from './MainSection'
import todos from '../todos'

class App extends Component {
  render () {
    const { todosData, actions } = this.props
    return (
      <div>
        <Header add={actions.add} />
        <MainSection todosData={todosData} actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  todosData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    todosData: state.todos
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(todos.actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
