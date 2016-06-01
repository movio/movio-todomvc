// This file is generated

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// FIXME - implement proper api
function api(aPathParam, aQueryParam) {
  return new Promise((resolve) => {
    // Use superagent
    // FIXME - where do we get the hostname from?
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
    resolve(response);
  });
}

const actionTypes = {
  getTodos_get: 'getTodos/get',
  getTodos_doing: 'getTodos/doing',
  getTodos_success: 'getTodos/success',
  getTodos_failure: 'getTodos/failure',
};

const actions = {
  getTodos_get: (aPathParam, aQueryParam) => ({
    type: actionTypes.getTodos_get,
    payload: {
      aPathParam,
      aQueryParam,
    },
  }),
  getTodos_doing: () => ({
    type: actionTypes.getTodos_doing,
  }),
  getTodos_success: (todos) => ({
    type: actionTypes.getTodos_success,
    payload: todos,
  }),
  getTodos_failure: (err) => ({
    type: actionTypes.getTodos_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  const { aPathParam, aQueryParam } = action.payload;
  try {
    yield put(actions.getTodos_doing());
    const { response } = yield call(api, aPathParam, aQueryParam);
    yield put(actions.getTodos_success(response));
  } catch (error) {
    yield put(actions.getTodos_failure(error));
  }
}

function* watchingSaga() {
  yield* takeEvery(actionTypes.getTodos_get, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  watchingSaga,
};

