import todos from '../todos';
// const { sagas } = todos;

const allSagas = [].concat(
  todos.sagas
  // others ...
);

export default allSagas;

