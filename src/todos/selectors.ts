import {  Iterable } from 'immutable'
import { TodoItem } from './models'

export const getTodoData = (state) => {
  return state.todo.todoItems.data as Iterable<number, TodoItem>
}

export const isFetching = (state) => {
  return state.todo.todoItems.data as boolean
}

export const getFilterType = (state) => {
  return state.todo.todoFilter.filterType as string
}
