import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.LOGIN} component={LoginPage} />
      <Route path={routes.SIGNUP} component={SignupPage} />
      <Redirect to="/" />
    </Switch>
  </App>
);
