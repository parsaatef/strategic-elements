import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import {
  COUNTER,
  HOME,
  SIGNIN,
  USER_REGISTER,
  ADD_NEW_ELEMENT,
  ADD_NEW_ELEMENT_FCS,
  ELEMENT_DETAIL_FOR_WORLD,
  INFORMATION_OF_ELEMENT,
  INFORMATION_OF_IRAN,
  INFORMATION_OF_WORLD,
  ADD_NEW_USER,
  USERS_LIST,
  PROFILE,
  USER_EDIT
} from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Signin from './components/Auth/Signin';
import withSession from './components/HOC/withSession';
import withAuth from './components/HOC/withAuth';
import AddNewElement from './components/Elements/AddNewElement';
import AddNewElementFCS from './components/Elements/AddNewElementFCS';
import ElementDetailForWorld from './components/Elements/ElementDetailForWorld';
import InformationOfElement from './components/Elements/InformationOfElement';
import InformationOfIran from './components/Information/InformationOfIran';
import InformationOfWorld from './components/Information/InformationOfWorld';
import UsersList from './components/Users/UsersList';
import Profile from './components/Users/Profile';

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
      <Route path={SIGNIN} render={() => <Signin refetch={refetch} />} />
      <RestrictedRoute
        session={session}
        path={ADD_NEW_ELEMENT}
        component={AddNewElement}
      />
      <RestrictedRoute
        session={session}
        path={ADD_NEW_ELEMENT_FCS}
        component={AddNewElementFCS}
      />
      <RestrictedRoute
        session={session}
        path={ELEMENT_DETAIL_FOR_WORLD}
        component={ElementDetailForWorld}
      />
      <RestrictedRoute
        session={session}
        path={INFORMATION_OF_ELEMENT}
        component={InformationOfElement}
      />
      <RestrictedRoute
        session={session}
        path={INFORMATION_OF_IRAN}
        component={InformationOfIran}
      />
      <RestrictedRoute
        session={session}
        path={INFORMATION_OF_WORLD}
        component={InformationOfWorld}
      />
      <RestrictedRoute
        session={session}
        path={ADD_NEW_USER}
        component={UsersList}
      />
      <RestrictedRoute
        session={session}
        path={USER_REGISTER}
        component={UsersList}
      />
      <RestrictedRoute
        session={session}
        path={USERS_LIST}
        component={UsersList}
      />
      <RestrictedRoute
        session={session}
        path={USER_EDIT}
        component={UsersList}
      />
      <RestrictedRoute session={session} path={PROFILE} component={Profile} />
      <Redirect to="/" />
    </Switch>
  </App>
);

const RootWithSession = withSession(Routes);

export default RootWithSession;
