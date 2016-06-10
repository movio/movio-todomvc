import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { reducers } from '../todos'

const rootReducer = combineReducers({
  todo: reducers,
  routing: routerReducer,
})

export default rootReducer
