// This whole file can be generated

import { takeEvery } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';

// import { actionTypes as actions } from './constants';

//------------------------------------------------
// GET todos
//------------------------------------------------
// FIXME - use fetch
const getRequest = () => new Promise((resolve) => {
  const response = {
    todos: [
      {
        text: 'Use Redux',
        completed: false,
      },
      {
        text: 'Use Saga',
        completed: false,
      },
    ],
  };

  // Faked the AJAX request
  window.setTimeout(() => {
    resolve(response);
  }, Math.random() * 1000);
});

const getTodosActionTypes = {
  get: 'getTodos/get',
  working: 'getTodos/working',
  ok: 'getTodos/ok',
  error: 'getTodos/error',
};
const getTodosActions = {
  getTodos_get: (params) => ({
    type: getTodosActionTypes.get,
    params,
  }),
  getTodos_ok: (todos) => ({
    type: getTodosActionTypes.ok,
    todos,
  }),
  getTodos_error: (err) => ({
    type: getTodosActionTypes.error,
    err,
  }),
};

function * getTodos() {
  try {
    yield put({ type: getTodosActions.getTodos_working });
    const { todos } = yield call(getRequest);
    yield put(getTodosActions.getTodos_ok(todos));
  } catch (error) {
    yield put(getTodosActions.getTodos_error(error));
  }
}
// Fetch todos whenever receive a FETCH action
function * watchGetTodos() {
  yield* takeEvery(getTodosActionTypes.get, getTodos);
}


//------------------------------------------------
// POST todo
//------------------------------------------------
// FIXME - impl wit fetch
const postRequest = () => new Promise((resolve) => {
  window.setTimeout(() => {
    resolve();
  }, Math.random() * 1000);
});

const postTodoActionTypes = {
  post: 'postTodo/post',
  working: 'postTodo/working',
  ok: 'postTodo/ok',
  error: 'postTodo/error',
};
const postTodoActions = {
  postTodoActions_post: (todo) => ({
    type: postTodoActionTypes.post,
    todo,
  }),
  postTodoActions_ok: (todo) => ({
    type: postTodoActionTypes.ok,
    todo,
  }),
  postTodoActions_error: (err) => ({
    type: postTodoActionTypes.error,
    err,
  }),
};
function * postTodo(todo) {
  try {
    yield put({ type: postTodoActions.working });
    const { todos } = yield call(postRequest);
    yield put(postTodoActions.ok(todos));
  } catch (error) {
    yield put(postTodoActions.error(error));
  }
}
function * watchPostTodo() {
  const { todo } = yield take(postTodoActionTypes.post);
  yield fork(postTodo, todo);
}


//------------------------------------------------
// Exports
//------------------------------------------------
export const actionTypes = {
  getTodosActionTypes,
  postTodoActionTypes,
};
export const actions = {
  ...getTodosActions,
  ...postTodoActions,
};

export const sagas = [
  watchGetTodos,
  watchPostTodo,
];

