import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import {
  COUNTER,
  HOME,
  SIGNIN,
  USER_REGISTER,
  ADDNEWELEMENT,
  ADDNEWELEMENTFCS,
  ELEMENTDETAILFORWORLD,
  INFORMATIONOFELEMENT,
  INFORMATIONOFIRAN,
  INFORMATIONOFWORLD,
  ADDNEWUSER,
  USERSLIST,
  PROFILE
} from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Signin from './components/Auth/Signin';
import UserRegister from './containers/admin/users/UserRegister';
import withSession from './components/HOC/withSession';
import withAuth from './components/HOC/withAuth';
import AddNewElement from './components/Elements/AddNewElement';
import AddNewElementFCS from './components/Elements/AddNewElementFCS';
import ElementDetailForWorld from './components/Elements/ElementDetailForWorld';
import InformationOfElement from './components/Elements/InformationOfElement';
import InformationOfIran from './components/Information/InformationOfIran';
import InformationOfWorld from './components/Information/InformationOfWorld';
import AddNewUser from './components/Users/AddNewUser';
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
      <RestrictedRoute
        path={USER_REGISTER}
        session={session}
        component={UserRegister}
      />
      <Route path={SIGNIN} render={() => <Signin refetch={refetch} />} />
      <RestrictedRoute
        session={session}
        path={ADDNEWELEMENT}
        component={AddNewElement}
      />
      <RestrictedRoute
        session={session}
        path={ADDNEWELEMENTFCS}
        component={AddNewElementFCS}
      />
      <RestrictedRoute
        session={session}
        path={ELEMENTDETAILFORWORLD}
        component={ElementDetailForWorld}
      />
      <RestrictedRoute
        session={session}
        path={INFORMATIONOFELEMENT}
        component={InformationOfElement}
      />
      <RestrictedRoute
        session={session}
        path={INFORMATIONOFIRAN}
        component={InformationOfIran}
      />
      <RestrictedRoute
        session={session}
        path={INFORMATIONOFWORLD}
        component={InformationOfWorld}
      />
      <RestrictedRoute
        session={session}
        path={ADDNEWUSER}
        component={AddNewUser}
      />
      <RestrictedRoute
        session={session}
        path={USERSLIST}
        component={UsersList}
      />
      <RestrictedRoute session={session} path={PROFILE} component={Profile} />
      <Redirect to="/" />
    </Switch>
  </App>
);

const RootWithSession = withSession(Routes);

export default RootWithSession;
