import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as todoReducers } from '../todos';

const routing = { routing: routerReducer };

const allReducers = Object.assign(
  {},
  routing,
  todoReducers
);

export default combineReducers(allReducers);

