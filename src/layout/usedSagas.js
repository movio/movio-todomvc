import { sagas } from '../generated/todo/';
const usedSagas = [].concat(
  sagas.getTodosTakeEverySaga,
  sagas.postTodosTakeLatestSaga
  // others ...
);
export default usedSagas;

