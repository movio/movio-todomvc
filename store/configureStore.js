import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../layout/rootReducer'
import rootSaga from '../layout/rootSaga'

export default function configureStore () {
  const store = createStore(rootReducer, applyMiddleware(rootSaga),
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
