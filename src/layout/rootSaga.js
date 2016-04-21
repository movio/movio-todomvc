import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

import todos from '../todos';
const { sagas } = todos;

const allSagas = [].concat(
  sagas
  // others ...
);

function * startSagas() {
  yield allSagas.map((_) => fork(_));
}

const sagaMiddleware = createSagaMiddleware(startSagas);
export default sagaMiddleware;

