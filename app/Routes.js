import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import AddNewElement from './components/Elements/AddNewElement';
import AddNewElementFCS from './components/Elements/AddNewElementFCS';
import ElementDetailForWorld from './components/Elements/ElementDetailForWorld';
import InformationOfElement from './components/Elements/InformationOfElement';
import InformationOfIran from './components/Information/InformationOfIran';
import InformationOfWorld from './components/Information/InformationOfWorld';
import AddNewUser from './components/Users/AddNewUser';
import UsersList from './components/Users/UsersList';
import Profile from './components/Users/Profile';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.LOGIN} component={LoginPage} />
      <Route path={routes.SIGNUP} component={SignupPage} />
      <Route path={routes.SIGNUP} component={SignupPage} />
      <Route path={routes.ADDNEWELEMENT} component={AddNewElement} />
      <Route path={routes.ADDNEWELEMENTFCS} component={AddNewElementFCS} />
      <Route
        path={routes.ELEMENTDETAILFORWORLD}
        component={ElementDetailForWorld}
      />
      <Route
        path={routes.INFORMATIONOFELEMENT}
        component={InformationOfElement}
      />
      <Route path={routes.INFORMATIONOFIRAN} component={InformationOfIran} />
      <Route path={routes.INFORMATIONOFWORLD} component={InformationOfWorld} />
      <Route path={routes.ADDNEWUSER} component={AddNewUser} />
      <Route path={routes.USERSLIST} component={UsersList} />
      <Route path={routes.PROFILE} component={Profile} />
      <Redirect to="/" />
    </Switch>
  </App>
);
