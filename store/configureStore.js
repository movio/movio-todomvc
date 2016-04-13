import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../layout/rootReducer'
import sagaMiddleware from '../layout/rootSaga'

export default function configureStore () {
  const store = createStore(rootReducer, compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../layout/rootReducer', () => {
      const nextReducer = require('../layout/rootReducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
