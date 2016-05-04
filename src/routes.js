import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './layout/App';

import todos from './todos';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={todos.MainSection} />
  </Route>
);
// FIXME
// <Route path="/todo/:id" component={Todo} />
// <Route path="*" component={NoMatch}/>

export default routes;
