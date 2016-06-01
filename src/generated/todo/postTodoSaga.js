// This file is generated

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// FIXME - implement proper api
function api(aPathParam, aQueryParam) {
  return new Promise((resolve) => {
    resolve('');
  });
}

const actionTypes = {
  postTodos_post: 'postTodos/post',
  postTodos_doing: 'postTodos/doing',
  postTodos_success: 'postTodos/success',
  postTodos_failure: 'postTodos/failure',
};

const actions = {
  postTodos_post: (body, aPathParam, aQueryParam) => ({
    type: actionTypes.postTodos_post,
    payload: {
      body,
      aPathParam,
      aQueryParam,
    },
  }),
  postTodos_success: (todos) => ({
    type: actionTypes.postTodos_success,
    payload: todos,
  }),
  postTodos_failure: (err) => ({
    type: actionTypes.postTodos_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  const { body, aPathParam, aQueryParam } = action.payload;
  try {
    yield put({ type: actions.postTodos_doing });
    const { response } = yield call(api, body, aPathParam, aQueryParam);
    yield put(actions.postTodos_success(response));
  } catch (error) {
    yield put(actions.postTodos_failure(error));
  }
}

function* watchingSaga() {
  yield* takeEvery(actionTypes.postTodos_post, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  watchingSaga,
};
