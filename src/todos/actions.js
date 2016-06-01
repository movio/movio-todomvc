import { actionTypes as t } from './constants';

export function add(text) {
  return { type: t.add, text };
}

export function deleteTodo(id) {
  return { type: t.delete, id };
}

export function edit(id, text) {
  return { type: t.edit, id, text };
}

export function complete(id) {
  return { type: t.complete, id };
}

export function toggleAll() {
  return { type: t.toggleAll };
}

export function clearCompleted() {
  return { type: t.clearCompleted };
}
