export const NAME = 'todos'

export const actionTypes = {
  ADD: 'todos/ADD',
  DELETE: 'todos/DELETE',
  EDIT: 'todos/EDIT',
  COMPLETE: 'todos/COMPLETE',
  TOGGLE_ALL: 'todos/TOGGLE_ALL',
  CLEAR_COMPLETED: 'todos/CLEAR_COMPLETED',
  FETCH: 'todos/FETCH',
  FETCHING: 'todos/FETCHING',
  FETCH_SUCCESS: 'todos/FETCH_SUCCESS',
  FETCH_ERROR: 'todos/FETCH_ERROR'
}

export const filters = {
  SHOW_ALL: 'show_all',
  SHOW_COMPLETED: 'show_completed',
  SHOW_ACTIVE: 'show_active'
}
