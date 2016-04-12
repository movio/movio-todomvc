import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga'

import todos from '../todos'
const { sagas } = todos

const allSagas = [
  sagas
  // others ...
]

function startSagas (...sagas) {
  return function * rootSaga () {
    yield sagas.map((saga) => fork(saga))
  }
}

const middleWare = createSagaMiddleware(startSagas(...allSagas))
export default middleWare

