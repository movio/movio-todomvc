import { expect } from 'chai'
import { List } from 'immutable'

import { TodoItem } from './models'
import {
  todoRequests as r,
  filterTypes as t,
} from './constants'
import { todos } from './reducer'

const assign = Object.assign

const fixture = Object.freeze({

  testState: () => ({
    isFetching: false,
    data: List<TodoItem>(),
    filterType: t.SHOW_ALL
  }),

  testTodo1: () => new TodoItem(101, 'test101', false),
  testTodo2: () => new TodoItem(102, 'test102', true),

})

describe('Todos Reducer', () => {

  describe('default', () => {
    it('should return original state if no action type mateched', () => {
      const actual = todos(fixture.testState(), { type: 'NOT_EXISTS' })
      expect(actual).to.deep.equal((fixture.testState()))
    })
  })

  describe('fetch', () => {
    it('should set isFetching flag to true when FETCH_REQUEST', () => {
      const expected = assign(fixture.testState(), {
        isFetching: true,
      })
      const actual = todos(fixture.testState(), { type: r.FETCH_REQUEST })
      expect(actual).to.deep.equal(expected)
    })

    it('should update data with fetched items when FETCH_SUCCESS', () => {
      const expected = assign(fixture.testState(), {
        isFetching: false,
        data: List.of(fixture.testTodo1()),
      })
      const actual = todos(fixture.testState(), {
        type: r.FETCH_SUCCESS,
        payload: {
          items: List.of(fixture.testTodo1()),
        }
      })
      expect(actual).to.deep.equal(expected)
    })

    it('should return empty todo list when FETCH_FAILURE', () => {
      const expected = assign(fixture.testState(), {
        isFetching: false,
        data: List<TodoItem>(),
      })
      const actual = todos(fixture.testState(), {
        type: r.FETCH_FAILURE,
        error: new Error('In purpose error.')
      })
      expect(actual).to.deep.equal(expected)
    })
  })

})

