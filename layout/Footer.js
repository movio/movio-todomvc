import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import { RaisedButton, List, ListItem, Divider, Styles } from 'material-ui'

import InboxIcon from 'material-ui/lib/svg-icons/content/inbox'
import LoopIcon from 'material-ui/lib/svg-icons/av/loop'
import ArchiveIcon from 'material-ui/lib/svg-icons/content/archive'

import MyRawTheme from '../src/material_ui_raw_theme_file'

import todos from '../todos'
const { constants } = todos

const palette = Styles.ThemeManager.getMuiTheme(MyRawTheme).baseTheme.palette

const FILTER_TITLES = {
  [constants.SHOW_ALL]: 'All',
  [constants.SHOW_ACTIVE]: 'Active',
  [constants.SHOW_COMPLETED]: 'Completed'
}

const FILTER_ICONS = {
  [constants.SHOW_ALL]: <InboxIcon />,
  [constants.SHOW_ACTIVE]: <LoopIcon />,
  [constants.SHOW_COMPLETED]: <ArchiveIcon />
}

class Footer extends Component {
  getCountForFilter (filter) {
    const { activeCount, completedCount } = this.props
    if (filter === constants.SHOW_ALL) return activeCount + completedCount
    if (filter === constants.SHOW_ACTIVE) return activeCount
    if (filter === constants.SHOW_COMPLETED) return completedCount
  }

  renderFilterLink (filter) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow } = this.props
    const active = filter === selectedFilter
    const count = this.getCountForFilter(filter)
    const onTouchTap = () => onShow(filter)
    return (
      <ListItem
        key={filter}
        className={classnames({ selected: active })}
        style={{color: active ? palette.primary1Color : palette.textColor}}
        primaryText={title + (count > 0 ? ' (' + count + ')' : '')}
        leftIcon={FILTER_ICONS[filter]}
        onClick={onTouchTap}
        onTouchTap={onTouchTap} />
    )
  }

  renderClearButton () {
    const { completedCount, onClearCompleted } = this.props
    if (completedCount > 0) {
      return (
        <RaisedButton
          className='clear-completed'
          primary
          label='Clear completed'
          onClick={onClearCompleted} />
      )
    }
  }

  render () {
    const filterFn = [constants.SHOW_ALL, constants.SHOW_ACTIVE, constants.SHOW_COMPLETED].map((filter) => this.renderFilterLink(filter))
    return (
      <footer className='footer'>
        <Divider style={{marginTop: 10}} />
        <List className='constants'>
          {filterFn}
        </List>
        {this.renderClearButton()}
      </footer>
    )
  }
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
}

export default Footer
