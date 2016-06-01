import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todos from '../todos';

const rootReducer = combineReducers({
  [todos.name]: todos.reducer,
  routing: routerReducer,
});

export default rootReducer;