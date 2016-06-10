import { List } from 'immutable'

import { TodoItem } from './models'
import {
  todoRequests as r,
  filterTypes as t,
  filterActionTypes as f,
} from './constants'

import update = require('react-addons-update')

const initialState = {
  isFetching: false,
  data: List<TodoItem>(),
  filterType: t.SHOW_ALL,
}

export function todos(state = initialState, action) {
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
    case r.UPDATE_SUCCESS:
      console.error('Failed to save todo item.', action.error)
      return state

    case r.DELETE_SUCCESS:
      const { deleted } = action.payload
      return update(state, {
        data: {$set: state.data.filter(s => !deleted.contains(s.id))}
      })

    case f.UPDATE_FILTER:
      return update(state, {
        filterType: {$set: action.payload.type}
      })

    default:
      return state
  }
}
