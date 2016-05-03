import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { ListItem, IconButton } from 'material-ui';
import { colors } from 'material-ui/styles';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxBlankIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.edit(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const { todo, complete, deleteTodo, todoId } = this.props;

    const deleteFn = () => deleteTodo(todoId);
    const iconButtonElement = (
      <IconButton>
        <MoreVertIcon color={colors.grey400} />
      </IconButton>
    );
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem primaryText="Edit" onTouchTap={this.handleEdit} />
        <MenuItem primaryText="Delete" onTouchTap={deleteFn} />
      </IconMenu>
    );

    const onSave = (text) => this.handleSave(todoId, text);
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text} editing={this.state.editing} onSave={onSave} />
      );
    } else {
      const onTouchTap = () => complete(todoId);
      element = (
        <ListItem
          primaryText={todo.text}
          onTouchTap={onTouchTap}
          onClick={onTouchTap}
          leftIcon={todo.completed ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
          rightIconButton={rightIconMenu}
        />
      );
    }

    return (
      <div
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing,
        })}
      >
        {element}
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired,
  todoId: PropTypes.number.isRequired,
};

export default TodoItem;
