import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { todos } from '../todos/reducer'

const rootReducer = combineReducers({
  todos,
  routing: routerReducer,
})

export default rootReducer
