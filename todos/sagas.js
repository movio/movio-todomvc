import { take } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as request from 'superagent'

import * as constants from './constants'

function * getTodos () {
  while (true) {
    yield take(constants.FETCH)
    try {
      yield put({ type: constants.TODOS })
      let { todos } = yield call(getRequest)
      yield put({ type: constants.FETCH_SUCCESS, todos })
    } catch (error) {
      yield put({ type: constants.FETCH_ERROR, error })
    }
  }
}

const getRequest = () => request.get('http://localhost:3100')

export default [getTodos]

