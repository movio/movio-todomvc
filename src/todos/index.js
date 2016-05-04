import { NAME, actionTypes } from './constants';
import * as actions from './actions';
import reducer from './reducer';
import sagas from './sagas';

// re-select
// import * as selectors from './selectors'
import MainSection from './components/MainSection';
import TodoItem from './components/TodoItem';
import TodoTextInput from './components/TodoTextInput';

export default {
  NAME,
  actionTypes,
  actions,
  reducer,
  sagas,
  MainSection,
  TodoItem,
  TodoTextInput,
};
