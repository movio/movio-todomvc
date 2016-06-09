import * as todoApi from '../generated/todo/';
const usedSagas = [].concat(
  todoApi.sagas.getTodosSaga.takeEverySaga,
  todoApi.sagas.postTodoSaga.takeLatestSaga
  // others ...
);
export default usedSagas;

