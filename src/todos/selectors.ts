import {  Iterable } from 'immutable'
import { TodoItem } from './models'

export const getTodoData = (state) => state.todos.data as Iterable<number, TodoItem>

export const getFilterType = (state) => state.todos.filterType as string
