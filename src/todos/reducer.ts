import { combineReducers } from 'redux'
import { List } from 'immutable'

import { TodoItem } from './models'
import {
  todoRequests as r,
  filterTypes as t,
  filterActionTypes as f,
} from './constants'

import update = require('react-addons-update')

const initialState = {
  todoItems: {
    isFetching: false,
    data: List<TodoItem>(),
  },
  todoFilter: {
    filterType: t.SHOW_ALL,
  },
}

// TODO: The only reason I expose this function is for testing
//       Can anyone suggest another solution?
export function todoItems(state = initialState.todoItems, action) {
  switch (action.type) {

    case r.FETCH_REQUEST:
      return update(state, {
        isFetching: {$set: true},
      })
    case r.FETCH_SUCCESS:
      return update(state, {
        isFetching: {$set: false},
        data: {$set: action.payload.items},
      })
    case r.FETCH_FAILURE:
      console.error('Failed to fetch todo items.', action.error)
      return update(state, {
        isFetching: {$set: false},
        data: {$set: List<TodoItem>()},
      })

    case r.UPDATE_SUCCESS:
      return update(state, {
        data: {$set: action.payload.items}
      })
    case r.UPDATE_FAILURE:
      console.error('Failed to save todo item.', action.error)
      return state

    case r.DELETE_SUCCESS:
      const { deleted } = action.payload
      return update(state, {
        data: {$set: state.data.filter(s => !deleted.contains(s.id))}
      })

    default:
      return state
  }
}

export function todoFilter(state = initialState.todoFilter, action) {
  switch (action.type) {

    case f.UPDATE_FILTER:
      return update(state, {
        filterType: {$set: action.payload.type}
      })

    default:
      return state
  }
}

export default combineReducers({
  todoItems,
  todoFilter,
})
