import { combineReducers } from 'redux'
import todos from '../todos'

const rootReducer = combineReducers({
  [todos.constants.NAME]: todos.reducer
})

export default rootReducer
