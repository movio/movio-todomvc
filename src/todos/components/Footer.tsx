import * as React from 'react';
import { Component } from 'react'
import * as classnames from 'classnames';

import { getMuiTheme } from 'material-ui/styles';
import { RaisedButton, List, ListItem, Divider, TouchTapEvent } from 'material-ui';
import InboxIcon from 'material-ui/svg-icons/content/inbox';
import LoopIcon from 'material-ui/svg-icons/av/loop';
import ArchiveIcon from 'material-ui/svg-icons/content/archive'

import MyRawTheme from '../../material_ui_raw_theme_file';

import { filters } from '../constants';

const palette = getMuiTheme(MyRawTheme).baseTheme.palette;

const FILTER_TITLES = {
  [filters.SHOW_ALL]: 'All',
  [filters.SHOW_ACTIVE]: 'Active',
  [filters.SHOW_COMPLETED]: 'Completed',
};

const FILTER_ICONS = {
  [filters.SHOW_ALL]: <InboxIcon />,
  [filters.SHOW_ACTIVE]: <LoopIcon />,
  [filters.SHOW_COMPLETED]: <ArchiveIcon />,
};

class Footer extends Component<FooterProps, any> {
  getCountForFilter(filter) {
    const { activeCount, completedCount } = this.props;
    if (filter === filters.SHOW_ALL) return activeCount + completedCount;
    if (filter === filters.SHOW_ACTIVE) return activeCount;
    if (filter === filters.SHOW_COMPLETED) return completedCount;
    throw new Error('Invalid filter provided');
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;
    const active = filter === selectedFilter;
    const count = this.getCountForFilter(filter);
    const onTouchTap = () => onShow(filter);
    const getCountString = countValue => countValue > 0 ? `(${countValue})` : '';
    return (
      <ListItem
        key={filter}
        className={classnames({ selected: active })}
        style={{ color: active ? palette.primary1Color : palette.textColor }}
        primaryText={`${title} ${getCountString(count)}`}
        leftIcon={FILTER_ICONS[filter]}
        onClick={onTouchTap}
        onTouchTap={onTouchTap}
      />
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <RaisedButton
          className="clear-completed"
          primary
          label="Clear completed"
          onTouchTap={onClearCompleted}
        />
      );
    }
    return null;
  }

  render() {
    const filterFn = [filters.SHOW_ALL, filters.SHOW_ACTIVE, filters.SHOW_COMPLETED]
      .map(filter => this.renderFilterLink(filter));
    return (
      <footer className="footer">
        <Divider style={{ marginTop: 10 }} />
        {/* TODO: what is this ??? className="filters"*/}
        <List>
          {filterFn}
        </List>
        {this.renderClearButton()}
      </footer>
    );
  }
}

interface FooterProps {
  completedCount: number,
  activeCount: number,
  filter: string,
  onClearCompleted: (event: TouchTapEvent) => void,
  onShow: Function,
}

export default Footer;
