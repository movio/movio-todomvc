import { Iterable } from 'immutable'
import { TodoItem } from './models'

export const NAME = 'todos';

export const todoRequests = {
  DELETE_REQUEST: 'todos/DELETE_REQUEST',
  DELETE_SUCCESS: 'todos/DELETE_SUCCESS',
  DELETE_FAILURE: 'todos/DELETE_FAILURE',
  UPDATE_REQUEST: 'todos/UPDATE_REQUEST',
  UPDATE_SUCCESS: 'todos/UPDATE_SUCCESS',
  UPDATE_FAILURE: 'todos/UPDATE_FAILURE',
  FETCH_REQUEST:  'todos/FETCH_REQUEST',
  FETCH_SUCCESS:  'todos/FETCH_SUCCESS',
  FETCH_FAILURE:  'todos/FETCH_FAILURE',
}

export const todoActionTypes = {
  LOAD_TODOS:   'todos/LOAD_TODOS',
  ADD_TODO:     'todos/ADD_TODO',
  UPDATE_TODO:  'todos/UPDATE_TODO',
  DELETE_TODOS: 'todos/DELETE_TODOS',
}

export interface Filter {
  type: string,
  name: string,
  fn: (items: Iterable<number, TodoItem>) => Iterable<number, TodoItem>
}

export const filterTypes = {
  SHOW_ALL:       'filters/SHOW_ALL',
  SHOW_ACTIVE:    'filters/SHOW_ACTIVE',
  SHOW_COMPLETED: 'filters/SHOW_COMPLETED',
}

export const filters: {[type: string]: Filter} = {
  [filterTypes.SHOW_ALL]: {
    type: filterTypes.SHOW_ALL,
    name: 'All',
    fn: (items: Iterable<number, TodoItem>) => items,
  },
  [filterTypes.SHOW_ACTIVE]: {
    type: filterTypes.SHOW_ACTIVE,
    name: 'Active',
    fn: (items: Iterable<number, TodoItem>) => items.filter(s => !s.completed),
  },
  [filterTypes.SHOW_COMPLETED]: {
    type: filterTypes.SHOW_COMPLETED,
    name: 'Completed',
    fn: (items: Iterable<number, TodoItem>) => items.filter(s => s.completed),
  }
}

export const filterActionTypes = {
  UPDATE_FILTER: 'filters/UPDATE_FILTER'
}
