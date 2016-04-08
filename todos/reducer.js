import * as t from './actionTypes'

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}]

export default function todos (state = initialState , action) {
  switch (action.type) {
    case t.ADD:
      return [{
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.text
      }, ...state]

    case t.DELETE:
      return state.filter(todo => todo.id !== action.id
      )

    case t.EDIT:
      return state.map(todo => todo.id === action.id ?
        Object.assign({}, todo, { text: action.text }) :
        todo
      )

    case t.COMPLETE:
      return state.map(todo => todo.id === action.id ?
        Object.assign({}, todo, { completed: !todo.completed }) :
        todo
      )

    case t.COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))

    case t.CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
