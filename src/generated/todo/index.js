// This file is generated

import * as getTodosSaga from './getTodosSaga';
import * as postTodoSaga from './postTodoSaga';

const actionTypes = Object.assign(
  {},
  getTodosSaga.actionTypes,
  postTodoSaga.actionTypes
);

const actions = Object.assign(
  {},
  getTodosSaga.actions,
  postTodoSaga.actions
);

const sagas = [].concat(
  getTodosSaga.takeEvery,
  postTodoSaga.takeLatest,
);

export {
  actionTypes,
  actions,
  sagas,
};
