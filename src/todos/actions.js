import { actionTypes as t } from './constants';

function add(text) {
  return { type: t.add, text };
}

function deleteTodo(id) {
  return { type: t.delete, id };
}

function edit(id, text) {
  return { type: t.edit, id, text };
}

function complete(id) {
  return { type: t.complete, id };
}

function toggleAll() {
  return { type: t.toggleAll };
}

function clearCompleted() {
  return { type: t.clearCompleted };
}

export {
  add,
  deleteTodo,
  edit,
  complete,
  toggleAll,
  clearCompleted,
};
