import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import {
  COUNTER,
  HOME,
  MINERAL_MANAGEMENT,
  MINERAL_REGISTER,
  MINERALS_LIST,
  MINERAL_EDIT,
  MINE_MANAGEMENT,
  MINE_REGISTER,
  MINES_LIST,
  MINE_EDIT,
  ELEMENT_MANAGEMENT,
  ELEMENT_REGISTER,
  ELEMENTS_LIST,
  ELEMENT_EDIT,
  GLOBAL_PRICE_MANAGEMENT,
  GLOBAL_PRICE_REGISTER,
  GLOBAL_PRICES_LIST,
  GLOBAL_PRICE_EDIT,
  SECONDARY_SOURCE_MANAGEMENT,
  SECONDARY_SOURCE_REGISTER,
  SECONDARY_SOURCES_LIST,
  SECONDARY_SOURCE_EDIT,
  ADD_NEW_ELEMENT,
  ADD_NEW_ELEMENT_FCS,
  ELEMENT_DETAIL_FOR_WORLD,
  INFORMATION_OF_ELEMENT,
  SECONDARY_SOURCE,
  INFORMATION_OF_IRAN,
  INFORMATION_OF_WORLD,
  ADD_NEW_USER,
  USERS_LIST,
  USER_REGISTER,
  SIGNIN,
  USER_EDIT,
  PROFILE
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
import MineralManagement from './containers/admin/mineral/mineralManagement';
import MineManagement from './containers/admin/mine/mineManagement';
import ElementManagement from './containers/admin/element/elementManagement';
import GlobalPriceManagement from './containers/admin/global-price/globalPriceManagement';
import SecondarySourceManagement from './containers/admin/secondary-source/secondarySourceManagement';

import SecondarySource from './components/Elements/SecondarySource';

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
        path={SECONDARY_SOURCE}
        component={SecondarySource}
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

      <RestrictedRoute
        session={session}
        path={MINERAL_MANAGEMENT}
        component={MineralManagement}
      />
      <RestrictedRoute
        session={session}
        path={MINERAL_REGISTER}
        component={MineralManagement}
      />
      <RestrictedRoute
        session={session}
        path={MINERALS_LIST}
        component={MineralManagement}
      />
      <RestrictedRoute
        session={session}
        path={MINERAL_EDIT}
        component={MineralManagement}
      />

      <RestrictedRoute
        session={session}
        path={MINE_MANAGEMENT}
        component={MineManagement}
      />
      <RestrictedRoute
        session={session}
        path={MINE_REGISTER}
        component={MineManagement}
      />
      <RestrictedRoute
        session={session}
        path={MINES_LIST}
        component={MineManagement}
      />
      <RestrictedRoute
        session={session}
        path={MINE_EDIT}
        component={MineManagement}
      />

      <RestrictedRoute
        session={session}
        path={ELEMENT_MANAGEMENT}
        component={ElementManagement}
      />
      <RestrictedRoute
        session={session}
        path={ELEMENT_REGISTER}
        component={ElementManagement}
      />
      <RestrictedRoute
        session={session}
        path={ELEMENTS_LIST}
        component={ElementManagement}
      />
      <RestrictedRoute
        session={session}
        path={ELEMENT_EDIT}
        component={ElementManagement}
      />

      <RestrictedRoute
        session={session}
        path={GLOBAL_PRICE_MANAGEMENT}
        component={GlobalPriceManagement}
      />
      <RestrictedRoute
        session={session}
        path={GLOBAL_PRICE_REGISTER}
        component={GlobalPriceManagement}
      />
      <RestrictedRoute
        session={session}
        path={GLOBAL_PRICES_LIST}
        component={GlobalPriceManagement}
      />
      <RestrictedRoute
        session={session}
        path={GLOBAL_PRICE_EDIT}
        component={GlobalPriceManagement}
      />

      <RestrictedRoute
        session={session}
        path={SECONDARY_SOURCE_MANAGEMENT}
        component={SecondarySourceManagement}
      />
      <RestrictedRoute
        session={session}
        path={SECONDARY_SOURCE_REGISTER}
        component={SecondarySourceManagement}
      />
      <RestrictedRoute
        session={session}
        path={SECONDARY_SOURCES_LIST}
        component={SecondarySourceManagement}
      />
      <RestrictedRoute
        session={session}
        path={SECONDARY_SOURCE_EDIT}
        component={SecondarySourceManagement}
      />
      <RestrictedRoute session={session} path={PROFILE} component={Profile} />
      <Redirect to="/" />
    </Switch>
  </App>
);

const RootWithSession = withSession(Routes);

export default RootWithSession;
