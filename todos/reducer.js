import * as t from './constants'
import * as I from 'immutable'

const uuid = () => Math.floor(Math.random() * 100000)

const todoMap = I.OrderedMap()

const initialState = todoMap.set(uuid(), {
  text: 'Use Redux',
  completed: false
})

export default function todos (state = initialState, action) {
  switch (action.type) {
    case t.ADD:
      return state.set(uuid(), {
        text: action.text,
        completed: false
      })

    case t.DELETE:
      return state.delete(action.id)

    case t.EDIT:
      const todoToEdit = state.get(action.id)
      return state.set(action.id, { ...todoToEdit, text: action.text })

    case t.COMPLETE:
      const todoToComplete = state.get(action.id)
      return state.set(action.id, { ...todoToComplete, completed: !todoToComplete.completed })

    case t.TOGGLE_ALL:
      return state.map((r) => { return { ...r, completed: !r.completed } })

    case t.CLEAR_COMPLETED:
      return state.filter((r) => r.completed === false)

    default:
      return state
  }
}
