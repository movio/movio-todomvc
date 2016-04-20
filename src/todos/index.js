import { NAME, actionTypes, filters } from './constants';
import * as actions from './actions';
import reducer from './reducer';
import sagas from './sagas';

// re-select
// import * as selectors from './selectors'
import TodoItem from './components/TodoItem.js';
import TodoTextInput from './components/TodoTextInput.js';

export default {
  NAME,
  actionTypes,
  filters,
  actions,
  reducer,
  sagas,
  TodoItem,
  TodoTextInput,
};
