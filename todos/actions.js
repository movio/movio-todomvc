import * as t from './actionTypes'

export function add (text) {
  return { type: t.ADD, text}
}

export function deleteTodo (id) {
  return { type: t.DELETE, id}
}

export function edit (id, text) {
  return { type: t.EDIT, id, text}
}

export function complete (id) {
  return { type: t.COMPLETE, id}
}

export function completeAll () {
  return { type: t.COMPLETE_ALL }
}

export function clearCompleted () {
  return { type: t.CLEAR_COMPLETED }
}
