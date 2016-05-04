import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { RaisedButton, List, ListItem, Divider } from 'material-ui';
import { getMuiTheme } from 'material-ui/styles';

import InboxIcon from 'material-ui/svg-icons/content/inbox';
import LoopIcon from 'material-ui/svg-icons/av/loop';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';

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

class Footer extends Component {
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
          onClick={onClearCompleted}
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
        <List className="filters">
          {filterFn}
        </List>
        {this.renderClearButton()}
      </footer>
    );
  }
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
};

export default Footer;
