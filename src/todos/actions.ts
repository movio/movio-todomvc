import { actionTypes as t } from './constants';

export interface TodoAction {
  type: string,
  [other: string]: any
}

export function add(text): TodoAction {
  return { type: t.ADD, text };
}

export function deleteTodo(id): TodoAction {
  return { type: t.DELETE, id };
}

export function edit(id, text): TodoAction {
  return { type: t.EDIT, id, text };
}

export function complete(id): TodoAction {
  return { type: t.COMPLETE, id };
}

export function toggleAll(): TodoAction {
  return { type: t.TOGGLE_ALL };
}

export function clearCompleted(): TodoAction {
  return { type: t.CLEAR_COMPLETED };
}

export function fetch(): TodoAction {
  return { type: t.FETCH };
}
