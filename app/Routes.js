import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { COUNTER, HOME, SIGNIN, USER_REGISTER } from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Signin from './components/Auth/Signin';
import UserRegister from './containers/admin/users/UserRegister';
import withSession from './components/HOC/withSession';
import withAuth from './components/HOC/withAuth';

let RestrictedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

RestrictedRoute = withAuth(session => session && session.getCurrentUser)(
  RestrictedRoute
);

type Props = {
  session: object,
  refetch: () => void
};

const Routes = ({ session, refetch }: Props) => (
  <App>
    <Switch>
      <RestrictedRoute
        exact
        path={HOME}
        session={session}
        component={HomePage}
      />
      <RestrictedRoute
        path={COUNTER}
        session={session}
        component={CounterPage}
      />
      <RestrictedRoute
        path={USER_REGISTER}
        session={session}
        component={UserRegister}
      />
      <Route path={SIGNIN} render={() => <Signin refetch={refetch} />} />
      <Redirect to="/" />
    </Switch>
  </App>
);

const RootWithSession = withSession(Routes);

export default RootWithSession;
