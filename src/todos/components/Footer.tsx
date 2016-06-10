import * as React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux'

import * as classnames from 'classnames'
import * as IM from 'immutable'

import { RaisedButton, List, ListItem, Divider } from 'material-ui'
import { getMuiTheme } from 'material-ui/styles'
import InboxIcon from 'material-ui/svg-icons/content/inbox'
import LoopIcon from 'material-ui/svg-icons/av/loop'
import ArchiveIcon from 'material-ui/svg-icons/content/archive'

import * as selectors from '../selectors'
import { filterTypes as t, filters, Filter } from '../constants'
import { TodoItem } from '../models'
import { deleteTodo, updateFilterType } from '../actions'
import MyRawTheme from '../../material_ui_raw_theme_file'

const palette = getMuiTheme(MyRawTheme).baseTheme.palette

export const filterIconMaps = {
  [t.SHOW_ALL]: {
    icon: <InboxIcon />,
  },
  [t.SHOW_ACTIVE]: {
    icon: <LoopIcon />,
  },
  [t.SHOW_COMPLETED]: {
    icon: <ArchiveIcon />,
  }
}

class Footer extends Component<FooterProps, any> {

  getFilterIcon(filterType: string) {
    switch (filterType) {
      case t.SHOW_ALL:
        return <InboxIcon />
      case t.SHOW_ACTIVE:
        return <LoopIcon />
      case t.SHOW_COMPLETED:
        return <ArchiveIcon />
      default:
        throw new Error(`Unknown filter type: ${filterType}.`)
    }
  }

  handleFilterChange(filterType: string) {
    const { updateFilterType } = this.props
    updateFilterType(filterType)
  }

  renderFilterLink(filter: Filter) {
    const { items, filterType } = this.props
    const { type, name, fn } = filter

    const active = type === filterType
    const count = fn(items).size
    const icon = this.getFilterIcon(type)

    return (
      <ListItem
        key={filter.type}
        className={classnames({ selected: active })}
        style={{ color: active ? palette.primary1Color : palette.textColor }}
        primaryText={`${name} ${count > 0 ? `(${count})` : ''}`}
        leftIcon={icon}
        onTouchTap={() => this.handleFilterChange(type)}
      />
    )
  }

  handleClearCompleted() {
    const { completedItemIds, deleteTodo } = this.props
    if (!completedItemIds.isEmpty()) {
      deleteTodo(completedItemIds)
    }
  }

  render() {
    const { completedItemIds } = this.props

    return (
      <footer className="footer">
        <Divider />

        <List>
          {Object.keys(filters).map(
            type => this.renderFilterLink(filters[type])
          )}
        </List>

        {completedItemIds.isEmpty() ? undefined :
          <RaisedButton
            className="clear-completed"
            primary={true}
            label="Clear completed"
            onTouchTap={this.handleClearCompleted.bind(this)}
          />
        }
      </footer>
    )
  }
}

interface FooterProps {
  filterType: string,
  items: IM.List<TodoItem>,
  completedItemIds: IM.List<number>,
  deleteTodo: (ids: IM.List<number>) => any,
  updateFilterType: (type: string) => any,
}

function mapStateToProps(state) {
  const items = selectors.getTodoData(state)
  const completedItemIds = items.filter(s => s.completed).map(s => s.id)
  const filterType = selectors.getFilterType(state)

  return { items, completedItemIds, filterType }
}

export default connect(mapStateToProps, {
  deleteTodo,
  updateFilterType,
})(Footer)
