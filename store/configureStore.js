import { createStore } from 'redux'
import rootReducer from '../layout/rootReducer'

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../layout/rootReducer', () => {
      const nextReducer = require('../layout/rootReducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
