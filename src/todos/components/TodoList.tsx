import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import * as classnames from 'classnames'
import * as IM from 'immutable'

import { colors } from 'material-ui/styles'
import { List, ListItem, IconButton, IconMenu, MenuItem, Checkbox } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import * as selectors from '../selectors'
import { filters } from '../constants'
import { TodoItem } from '../models'
import { addTodo, updateTodo, deleteTodo } from '../actions'
import TodoTextInput from './TodoTextInput'

class TodoListItem extends Component<TodoListItemProps, TodoListItemStates> {

  componentWillMount() {
    this.setState({ editable: false })
  }

  handleSave(updatedText: string) {
    const { item, onSave } = this.props
    onSave(item.setText(updatedText))
    this.setState({ editable: false })
  }

  handleEdit() {
    this.setState({ editable: true });
  }

  handleDelete() {
    const { item, onDelete } = this.props
    onDelete(item)
  }

  handleToggle(_, checked: boolean) {
    const { item, onSave } = this.props
    onSave(item.setCompleted(checked))
  }

  renderListItem(item: TodoItem) {
    const dropdownButton = (
      <IconButton>
        <MoreVertIcon color={colors.grey400} />
      </IconButton>
    )

    const dropdown = (
      <IconMenu iconButtonElement={dropdownButton}>
        <MenuItem primaryText="Edit" onTouchTap={this.handleEdit.bind(this)} />
        <MenuItem primaryText="Delete" onTouchTap={this.handleDelete.bind(this)} />
      </IconMenu>
    )

    const checkbox = (
      <Checkbox
        className="toggle-all"
        style={{ marginBottom: 10 }}
        defaultChecked={item.completed}
        onCheck={this.handleToggle.bind(this)}
      />
    )

    return (
      <ListItem
        primaryText={item.text}
        leftIcon={checkbox}
        rightIconButton={dropdown}
      />
    )
  }

  renderInput(item: TodoItem, editable: boolean, onSave: Function) {
    return (
      <TodoTextInput
        text={item.text}
        isNew={item.id <= 0}
        editable={editable}
        style={{ marginLeft: '72px' }}
        onSave={this.handleSave.bind(this)}
      />
    )
  }

  render() {
    const { item, onSave } = this.props
    const { editable } = this.state

    const classNames = classnames({
      completed: item.completed,
      editing: editable
    })

    return (
      <div className={classNames}>
        { editable
          ? this.renderInput(item, editable, onSave)
          : this.renderListItem(item)
        }
      </div>
    )
  }
}

class TodoList extends Component<TodoListProps, any> {

  componentWillMount() {
    this.setState({ editable: false })
  }

  handleSave(item: TodoItem) {
    if (item.text.trim().length === 0)
      this.props.deleteTodo(IM.List.of(item.id))
    else
      this.props.updateTodo(IM.List.of(item))
  }

  handleDelete(item: TodoItem) {
    this.props.deleteTodo(IM.List.of(item.id))
  }

  handleToggleAll(_, checked: boolean) {
    const { items, updateTodo } = this.props
    updateTodo(items.map(s => s.setCompleted(checked)).toList())
  }

  renderContent(items: IM.Iterable<number, TodoItem>) {
    const completed = items.filter(t => t.completed)
    return (
      <div>
        <Checkbox
          className="toggle-all"
          style={{ marginBottom: 10 }}
          label="Toggle All"
          checked={completed.size === items.size}
          onCheck={this.handleToggleAll.bind(this)} />

        <List>
          {
            items.map(item => (
              <TodoListItem
                key={item.id}
                item={item}
                onSave={this.handleSave.bind(this)}
                onDelete={this.handleDelete.bind(this)}
              />
            )).toArray()
        }
        </List>
      </div>
    )
  }

  render() {
    const { items, filterType } = this.props
    const filtered = filters[filterType].fn(items)
    return (
      <div>
        {filtered.isEmpty() ? undefined : this.renderContent(filtered)}
      </div>
    )
  }
}

interface TodoListProps {
  items: IM.Iterable<number, TodoItem>,
  filterType: string,
  addTodo: (text: string) => any,
  updateTodo: (item: IM.List<TodoItem>) => any,
  deleteTodo: (itemIds: IM.List<number>) => any,
}

interface TodoListItemProps {
  item: TodoItem,
  onSave: (item: TodoItem) => void,
  onDelete: (item: TodoItem) => void,
}

interface TodoListItemStates {
  editable: boolean
}

const mapStateToProps = (state) => ({
  items: selectors.getTodoData(state),
  filterType: selectors.getFilterType(state),
})

export default connect(mapStateToProps, {
  addTodo,
  updateTodo,
  deleteTodo,
})(TodoList)
