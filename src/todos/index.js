import { name, actionTypes as mainActionTypes } from './constants';
import * as mainActions from './actions';
import reducer from './reducer';
import getTodosSaga from './getTodosSaga';
// import { postTodoSaga, postTodoActionTypes, postTodoActions } from './postTodoSaga';

// re-select
// import * as selectors from './selectors'

import MainSection from './components/MainSection';

const actionTypes = Object.assign(
  {},
  mainActionTypes,
  getTodosSaga.actionTypes
  // postTodoActionTypes
);

const actions = Object.assign(
  {},
  mainActions,
  getTodosSaga.actions
  // postTodoActions
);

const sagas = [
  getTodosSaga.watchingSaga,
];

export default {
  name,
  actionTypes,
  actions,
  reducer,
  sagas,
  MainSection,
};
