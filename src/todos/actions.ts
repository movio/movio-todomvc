import { List } from 'immutable'

import { TodoItem } from './models'
import {
  todoRequests as r,
  todoActionTypes as t,
  filterActionTypes as f,
} from './constants'

export interface TodoAction {
  type: string,
  payload: {
    [other: string]: any
  }
}

function action(type: string, payload = {}): TodoAction {
  return { type, payload }
}

// ============================================================================

export const loadTodoItems = () => action(t.LOAD_TODOS)
export const addTodo = (text: string) => action(t.ADD_TODO, { text })
export const updateTodo = (items: List<TodoItem>) => action(t.UPDATE_TODO, { items })
export const deleteTodo = (itemIds: List<number>) => action(t.DELETE_TODOS, { itemIds })

export const updateFilterType = (type: string) => action(f.UPDATE_FILTER, { type })

// ============================================================================

export const fetch = {
  request: () => action(r.FETCH_REQUEST),
  success: (items: List<TodoItem>) => action(r.FETCH_SUCCESS, { items }),
  failure: (error: Error) => action(r.FETCH_FAILURE, { error })
}

export const add = {
  request: (text: string) => action(r.UPDATE_REQUEST, { id: 0, text }),
  success: (items: List<TodoItem>) => action(r.UPDATE_SUCCESS, { items }),
  failure: (error: Error) => action(r.UPDATE_FAILURE, { error })
}

export const update = {
  request: (items: List<TodoItem>) => action(r.UPDATE_REQUEST, { items }),
  success: (items: List<TodoItem>) => action(r.UPDATE_SUCCESS, { items }),
  failure: (error: Error) => action(r.UPDATE_FAILURE, { error })
}

export const remove = {
  request: (itemIds: List<number>) => action(r.DELETE_REQUEST, { itemIds }),
  success: (deleted: List<number>) => action(r.DELETE_SUCCESS, { deleted }),
  failure: (error: Error) => action(r.DELETE_FAILURE, { error })
}
