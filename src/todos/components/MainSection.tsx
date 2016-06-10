import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import { loadTodoItems } from '../actions'

import Footer from './Footer'
import Header from './Header'
import TodoList from './TodoList'

class MainSection extends Component<MainSectionProps, any> {

  componentDidMount() {
    this.props.loadTodoItems()
  }

  render() {
    return (
      <div id="todo-content">
        <Header />
        <section className="main todo-list">
          <TodoList />
        </section>
        <Footer />
      </div>
    );
  }
}

interface MainSectionProps {
  loadTodoItems: Function,
}

export default connect(undefined, {
  loadTodoItems,
})(MainSection)
