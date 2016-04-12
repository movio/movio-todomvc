import { combineReducers } from 'redux'
import todos from '../todos'

const rootReducer = combineReducers({
  [todos.NAME]: todos.reducer
})

export default rootReducer
