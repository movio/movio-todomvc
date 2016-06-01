export const name = 'todos';

const actionTypes = {
  add: 'todos/add',
  delete: 'todos/delete',
  edit: 'todos/edit',
  complete: 'todos/complete',
  toggleAll: 'todos/toggleAll',
  clearCompleted: 'todos/clearCompleted',
};

const filters = {
  showAll: 'showAll',
  showCompletet: 'showCompleted',
  showActive: 'showActive',
};

export {
  actionTypes,
  filters,
};
