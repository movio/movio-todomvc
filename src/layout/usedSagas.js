import { sagas } from '../generated/todo/';
const usedSagas = [].concat(
  sagas.getTodosSaga.takeEverySaga,
  sagas.postTodoSaga.takeLatestSaga
  // others ...
);
export default usedSagas;

