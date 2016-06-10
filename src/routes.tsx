import * as React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './layout/App'

import { MainSection as Todo } from './todos'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Todo} />
  </Route>
)

// FIXME
// <Route path="/todo/:id" component={Todo} />
// <Route path="*" component={NoMatch}/>

export default routes
