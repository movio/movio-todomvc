import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as request from 'superagent'

import { Map } from 'immutable'
import { actionTypes as actions } from './constants'

function * getTodos () {
  try {
    yield put({ type: actions.FETCHING })
    const { todos } = yield call(getRequest)
    yield put({ type: actions.FETCH_SUCCESS, todos })
  } catch (error) {
    yield put({ type: actions.FETCH_ERROR, error })
  }
}

// Fetch todos whenever receive a FETCH action
function * watchTodos() {
  yield * takeEvery(actions.FETCH, getTodos)
}

const getRequest = () => new Promise((resolve, _) => {

  const response = {
    todos: [
      {
        text: 'Use Redux',
        completed: false
      },
      {
        text: 'Use Saga',
        completed: false
      }
    ]
  }

  // Faked the AJAX request
  window.setTimeout(() => {
    resolve(response)
  }, Math.random() * 1000)
})

export default [
  watchTodos
]
