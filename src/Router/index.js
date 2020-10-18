import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/** Containers */
import App from '../containers/App';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
