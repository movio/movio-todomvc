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

const filterTitles = {
  [filters.showAll]: 'All',
  [filters.showActive]: 'Active',
  [filters.showCompleted]: 'Completed',
};

const filterIcons = {
  [filters.showAll]: <InboxIcon />,
  [filters.showActive]: <LoopIcon />,
  [filters.showCompleted]: <ArchiveIcon />,
};

class Footer extends Component {
  getCountForFilter(filter) {
    const { activeCount, completedCount } = this.props;
    if (filter === filters.showAll) return activeCount + completedCount;
    if (filter === filters.showActive) return activeCount;
    if (filter === filters.showCompleted) return completedCount;
    throw new Error('Invalid filter provided');
  }

  renderFilterLink(filter) {
    const title = filterTitles[filter];
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
        leftIcon={filterIcons[filter]}
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
          primary={true}
          label="Clear completed"
          onClick={onClearCompleted}
        />
      );
    }
    return null;
  }

  render() {
    const filterFn = [filters.showAll, filters.showActive, filters.showCompleted]
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
