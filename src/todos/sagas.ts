import { List } from 'immutable'
import { takeLatest } from 'redux-saga'
import { call, put, take, fork } from 'redux-saga/effects'

import * as api from './api'
import { add, update, remove, fetch } from './actions'
import { TodoItem } from './models'
import { todoActionTypes as t } from './constants'

function* getTodos() {
  yield put(fetch.request())
  const { response, error } = yield call(api.getTodoItems)
  if (response)
    yield put(fetch.success(response))
    else
    yield put(fetch.failure(error))
}

function* addTodo(text: string) {
  yield put(add.request(text))
  const newItem = TodoItem.create(text)
  const { response, error } = yield call(api.putTodoItem, List.of(newItem))
  if (response)
    yield put(add.success(response))
  else
    yield put(add.failure(error))
}

function* updateTodo(items: List<TodoItem>) {
  yield put(update.request(items))
  const { response, error } = yield call(api.putTodoItem, items)
  if (response)
    yield put(update.success(response))
  else
    yield put(update.failure(error))
}

function* deleteTodos(itemIds: List<number>) {
  yield put(remove.request(itemIds))
  const { response, error } = yield call(api.deleteTodoItems, itemIds)
  if (response)
    yield put(remove.success(itemIds))
  else
    yield put(remove.failure(error))
}

// ============================================================================

function* watchGetTodos() {
  yield* takeLatest(t.LOAD_TODOS, getTodos)
}

function* watchAddTodos() {
  while (true) {
    const action = yield take(t.ADD_TODO)
    const { text } = action.payload
    yield fork(addTodo, text)
  }
}

function* watchUpdateTodo() {
  while (true) {
    const action = yield take(t.UPDATE_TODO)
    const { items } = action.payload
    yield fork(updateTodo, items)
  }
}

function* watchDeleteTodo() {
  while (true) {
    const action = yield take(t.DELETE_TODOS)
    const { itemIds } = action.payload
    yield fork(deleteTodos, itemIds)
  }
}

export default [
  watchGetTodos,
  watchAddTodos,
  watchUpdateTodo,
  watchDeleteTodo,
]
