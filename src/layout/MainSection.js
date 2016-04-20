import React, { Component, PropTypes } from 'react';

import { Checkbox, List } from 'material-ui';
import { getMuiTheme } from 'material-ui/styles';
import MyRawTheme from '../material_ui_raw_theme_file';

import Footer from './Footer';
import todos from '../todos';
const { filters, TodoItem } = todos;

const defaultStyle = {
  width: 300,
  marginLeft: 20,
};

const TODO_FILTERS = {
  [filters.SHOW_ALL]: () => true,
  [filters.SHOW_ACTIVE]: (todo) => !todo.completed,
  [filters.SHOW_COMPLETED]: (todo) => todo.completed,
};

class MainSection extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  constructor(props, context) {
    super(props, context);
    this.state = { filter: filters.SHOW_ALL };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(MyRawTheme) };
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todosData.some((todo) => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount) {
    const { todosData, actions } = this.props;
    if (todosData.size > 0) {
      return (
        <Checkbox
          className="toggle-all"
          style={{ marginBottom: 10 }}
          label="Toggle All"
          defaultChecked={completedCount === todosData.size}
          onCheck={actions.toggleAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
    const { todosData } = this.props;
    const { filter } = this.state;
    const activeCount = todosData.size - completedCount;

    if (todosData.size) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          onShow={this.handleShow.bind(this)}
        />
      );
    }
  }

  render() {
    const { todosData, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todosData.filter(TODO_FILTERS[filter]);
    const completedCount = todosData.reduce((count, todo) => todo.completed ? count + 1 : count, 0);

    return (
      <section className="main" style={defaultStyle}>
        {this.renderToggleAll(completedCount)}
        <List className="todo-list">
        {filteredTodos.map(
          (todo, id) => <TodoItem key={id} todo={todo} todoId={id} {...actions} />
        )}
        </List>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  todosData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MainSection;
