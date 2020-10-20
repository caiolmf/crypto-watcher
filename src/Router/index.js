import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/** Containers */
import App from '../containers/App';
import Exchange from '../containers/Exchange';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/exchange/:coin" component={Exchange} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
