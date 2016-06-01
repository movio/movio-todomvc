import * as todoApi from '../generated/todo/';

const allSagas = [].concat(
  todoApi.sagas
  // others ...
);

export default allSagas;

