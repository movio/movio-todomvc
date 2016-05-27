import * as React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './layout/App'

import TodoSection from './todos'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={TodoSection} />
  </Route>
)

// FIXME
// <Route path="/todo/:id" component={Todo} />
// <Route path="*" component={NoMatch}/>

export default routes
