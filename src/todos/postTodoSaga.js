// This whole file can be generated

// import { takeEvery } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';

// FIXME - implement proper api
const postRequest = () => new Promise((resolve) => {
  window.setTimeout(() => {
    resolve();
  }, Math.random() * 1000);
});

const actionTypes = {
  post: 'postTodo/post',
  working: 'postTodo/working',
  ok: 'postTodo/ok',
  error: 'postTodo/error',
};
const actions = {
  postTodo_post: (todo) => ({
    type: actionTypes.post,
    todo,
  }),
  postTodo_ok: (todo) => ({
    type: actionTypes.ok,
    todo,
  }),
  postTodo_error: (err) => ({
    type: actionTypes.error,
    err,
  }),
};

function * postTodo(todo) {
  try {
    yield put({ type: actions.working });
    const { todos } = yield call(postRequest);
    yield put(actions.ok(todos));
  } catch (error) {
    yield put(actions.error(error));
  }
}
function * saga() {
  const { todo } = yield take(actionTypes.post);
  yield fork(postTodo, todo);
}


export default {
  actions,
  actionTypes,
  saga,
};
