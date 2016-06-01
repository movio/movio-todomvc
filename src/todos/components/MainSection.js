import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Checkbox, List } from 'material-ui';
import { getMuiTheme } from 'material-ui/styles';
import MyRawTheme from '../../material_ui_raw_theme_file';

import Header from './Header';
import Footer from './Footer';
import TodoItem from './TodoItem';

import { filters } from '../constants';

import * as mainActions from '../actions';
import * as todoApi from '../../generated/todo';
const allActions = Object.assign({}, mainActions, todoApi.actions);

const defaultStyle = {
  width: 300,
  marginLeft: 20,
};

const todoFilters = {
  [filters.showAll]: () => true,
  [filters.showActive]: (todo) => !todo.completed,
  [filters.showCompleted]: (todo) => todo.completed,
};

class MainSection extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  constructor(props, context) {
    super(props, context);
    this.state = { filter: filters.showAll };
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(MyRawTheme) };
  }

  componentDidMount() {
    this.props.actions.getTodos_get('dummyPathParam', { dumuyQueryParam: 'someText' });
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
    return null;
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
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
    return null;
  }

  render() {
    const { todosData, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todosData.filter(todoFilters[filter]);
    const completedCount = todosData.reduce((count, todo) => todo.completed ? count + 1 : count, 0);

    return (
      <div>
        <Header add={this.props.actions.add} />
        <section className="main" style={defaultStyle}>
          {this.renderToggleAll(completedCount)}
          <List className="todo-list">
          {filteredTodos.map(
            (todo, id) => <TodoItem key={id} todo={todo} todoId={id} {...actions} />
          )}
          </List>
          {this.renderFooter(completedCount)}
        </section>
      </div>
    );
  }
}

MainSection.propTypes = {
  todosData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    todosData: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);
