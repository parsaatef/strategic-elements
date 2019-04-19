import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import {
  COUNTER,
  HOME,
  MINERAL_REGISTER,
  MINERALS_LIST,
  MINERAL_EDIT,
  MINE_MANAGEMENT,
  MINE_REGISTER,
  MINES_LIST,
  MINE_EDIT,
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
  TOTAL_STATS_MANAGEMENT,
  TOTAL_STATS_REGISTER,
  TOTAL_STATS_LIST,
  TOTAL_STATS_EDIT,
  EXPORT_MANAGEMENT,
  EXPORT_REGISTER,
  EXPORT_LIST,
  EXPORT_EDIT,
  IMPORT_REGISTER,
  IMPORT_LIST,
  IMPORT_EDIT,
  WORLD_RESERVES_REGISTER,
  WORLD_RESERVES_LIST,
  WORLD_RESERVES_EDIT,
  IRAN_RESERVES_REGISTER,
  IRAN_RESERVES_LIST,
  IRAN_RESERVES_EDIT,
  WORLD_PRODUCTION_REGISTER,
  WORLD_PRODUCTION_LIST,
  WORLD_PRODUCTION_EDIT,
  IRAN_PRODUCTION_REGISTER,
  IRAN_PRODUCTION_LIST,
  IRAN_PRODUCTION_EDIT,
  WORLD_CONSUMPTION_REGISTER,
  WORLD_CONSUMPTION_LIST,
  WORLD_CONSUMPTION_EDIT,
  IRAN_CONSUMPTION_REGISTER,
  IRAN_CONSUMPTION_LIST,
  IRAN_CONSUMPTION_EDIT,
  DEPENDENCE_INDUSTRIES_REGISTER,
  DEPENDENCE_INDUSTRIES_LIST,
  DEPENDENCE_INDUSTRIES_EDIT,
  TECHNOLOGICAL_LEVEL_REGISTER,
  TECHNOLOGICAL_LEVEL_LIST,
  TECHNOLOGICAL_LEVEL_EDIT,
  SECONDARY_PRODUCTION_REGISTER,
  SECONDARY_PRODUCTION_LIST,
  SECONDARY_PRODUCTION_EDIT,
  UPSTREAM_INDUSTRY_REGISTER,
  UPSTREAM_INDUSTRY_LIST,
  UPSTREAM_INDUSTRY_EDIT,
  THREAT_REGISTER,
  THREATS_LIST,
  THREAT_EDIT,
  ENVIRONMENT_REGISTER,
  ENVIRONMENT_LIST,
  ENVIRONMENT_EDIT,
  ADD_NEW_ELEMENT,
  ADD_NEW_ELEMENT_FCS,
  ELEMENT_DETAIL_FOR_WORLD,
  INFORMATION_OF_ELEMENT,
  SECONDARY_SOURCE,
  INFORMATION_OF_IRAN,
  INFORMATION_OF_WORLD,
  ADD_NEW_USER,
  USER_MANAGEMENT,
  USERS_LIST,
  USER_REGISTER,
  USER_EDIT,
  SIGNIN,
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
import usersManagement from './containers/admin/users/usersManagement';
import TotalStatsManagement from './containers/admin/total-stats/totalStatsManagement';
import ExportManagement from './containers/admin/export/exportManagement';
import ImportManagement from './containers/admin/import/importManagement';
import WorldReservesManagement from './containers/admin/world-reserves/worldReservesManagement';
import IranReservesManagement from './containers/admin/iran-reserves/iranReservesManagement';
import WorldProductionManagement from './containers/admin/world-production/worldProductionManagement';
import IranProductionManagement from './containers/admin/iran-production/iranProductionManagement';
import WorldConsumptionManagement from './containers/admin/world-consumption/worldConsumptionManagement';
import IranConsumptionManagement from './containers/admin/iran-consumption/iranConsumptionManagement';
import DependenceIndustriesManagement from './containers/admin/dependence-industries/dependenceIndustriesManagement';
import TechnologicalLevelManagement from './containers/admin/technological-level/technologicalLevelManagement';
import SecondaryProductionManagement from './containers/admin/secondary-production/secondaryProductionManagement';
import UpstreamIndustryManagement from './containers/admin/upstream-industry/upstreamIndustryManagement';
import ThreatManagement from './containers/admin/threat/threatManagement';
import EnvironmentManagement from './containers/admin/environment/environmentManagement';

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
        path={USER_MANAGEMENT}
        component={usersManagement}
      />
      <RestrictedRoute
        session={session}
        path={USER_REGISTER}
        component={usersManagement}
      />
      <RestrictedRoute
        session={session}
        path={USERS_LIST}
        component={usersManagement}
      />
      <RestrictedRoute
        session={session}
        path={USER_EDIT}
        component={usersManagement}
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

      <RestrictedRoute
        session={session}
        path={TOTAL_STATS_MANAGEMENT}
        component={TotalStatsManagement}
      />
      <RestrictedRoute
        session={session}
        path={TOTAL_STATS_REGISTER}
        component={TotalStatsManagement}
      />
      <RestrictedRoute
        session={session}
        path={TOTAL_STATS_LIST}
        component={TotalStatsManagement}
      />
      <RestrictedRoute
        session={session}
        path={TOTAL_STATS_EDIT}
        component={TotalStatsManagement}
      />

      <RestrictedRoute
        session={session}
        path={EXPORT_MANAGEMENT}
        component={ExportManagement}
      />
      <RestrictedRoute
        session={session}
        path={EXPORT_REGISTER}
        component={ExportManagement}
      />
      <RestrictedRoute
        session={session}
        path={EXPORT_LIST}
        component={ExportManagement}
      />
      <RestrictedRoute
        session={session}
        path={EXPORT_EDIT}
        component={ExportManagement}
      />

      <RestrictedRoute
        session={session}
        path={IMPORT_REGISTER}
        component={ImportManagement}
      />
      <RestrictedRoute
        session={session}
        path={IMPORT_LIST}
        component={ImportManagement}
      />
      <RestrictedRoute
        session={session}
        path={IMPORT_EDIT}
        component={ImportManagement}
      />

      <RestrictedRoute
        session={session}
        path={WORLD_RESERVES_REGISTER}
        component={WorldReservesManagement}
      />
      <RestrictedRoute
        session={session}
        path={WORLD_RESERVES_LIST}
        component={WorldReservesManagement}
      />
      <RestrictedRoute
        session={session}
        path={WORLD_RESERVES_EDIT}
        component={WorldReservesManagement}
      />

      <RestrictedRoute
        session={session}
        path={IRAN_RESERVES_REGISTER}
        component={IranReservesManagement}
      />
      <RestrictedRoute
        session={session}
        path={IRAN_RESERVES_LIST}
        component={IranReservesManagement}
      />
      <RestrictedRoute
        session={session}
        path={IRAN_RESERVES_EDIT}
        component={IranReservesManagement}
      />

      <RestrictedRoute
        session={session}
        path={WORLD_PRODUCTION_REGISTER}
        component={WorldProductionManagement}
      />
      <RestrictedRoute
        session={session}
        path={WORLD_PRODUCTION_LIST}
        component={WorldProductionManagement}
      />
      <RestrictedRoute
        session={session}
        path={WORLD_PRODUCTION_EDIT}
        component={WorldProductionManagement}
      />

      <RestrictedRoute
        session={session}
        path={IRAN_PRODUCTION_REGISTER}
        component={IranProductionManagement}
      />
      <RestrictedRoute
        session={session}
        path={IRAN_PRODUCTION_LIST}
        component={IranProductionManagement}
      />
      <RestrictedRoute
        session={session}
        path={IRAN_PRODUCTION_EDIT}
        component={IranProductionManagement}
      />

      <RestrictedRoute
        session={session}
        path={WORLD_CONSUMPTION_REGISTER}
        component={WorldConsumptionManagement}
      />
      <RestrictedRoute
        session={session}
        path={WORLD_CONSUMPTION_LIST}
        component={WorldConsumptionManagement}
      />
      <RestrictedRoute
        session={session}
        path={WORLD_CONSUMPTION_EDIT}
        component={WorldConsumptionManagement}
      />

      <RestrictedRoute
        session={session}
        path={IRAN_CONSUMPTION_REGISTER}
        component={IranConsumptionManagement}
      />
      <RestrictedRoute
        session={session}
        path={IRAN_CONSUMPTION_LIST}
        component={IranConsumptionManagement}
      />
      <RestrictedRoute
        session={session}
        path={IRAN_CONSUMPTION_EDIT}
        component={IranConsumptionManagement}
      />

      <RestrictedRoute
        session={session}
        path={DEPENDENCE_INDUSTRIES_REGISTER}
        component={DependenceIndustriesManagement}
      />
      <RestrictedRoute
        session={session}
        path={DEPENDENCE_INDUSTRIES_LIST}
        component={DependenceIndustriesManagement}
      />
      <RestrictedRoute
        session={session}
        path={DEPENDENCE_INDUSTRIES_EDIT}
        component={DependenceIndustriesManagement}
      />

      <RestrictedRoute
        session={session}
        path={TECHNOLOGICAL_LEVEL_REGISTER}
        component={TechnologicalLevelManagement}
      />
      <RestrictedRoute
        session={session}
        path={TECHNOLOGICAL_LEVEL_LIST}
        component={TechnologicalLevelManagement}
      />
      <RestrictedRoute
        session={session}
        path={TECHNOLOGICAL_LEVEL_EDIT}
        component={TechnologicalLevelManagement}
      />

      <RestrictedRoute
        session={session}
        path={SECONDARY_PRODUCTION_REGISTER}
        component={SecondaryProductionManagement}
      />
      <RestrictedRoute
        session={session}
        path={SECONDARY_PRODUCTION_LIST}
        component={SecondaryProductionManagement}
      />
      <RestrictedRoute
        session={session}
        path={SECONDARY_PRODUCTION_EDIT}
        component={SecondaryProductionManagement}
      />

      <RestrictedRoute
        session={session}
        path={UPSTREAM_INDUSTRY_REGISTER}
        component={UpstreamIndustryManagement}
      />
      <RestrictedRoute
        session={session}
        path={UPSTREAM_INDUSTRY_LIST}
        component={UpstreamIndustryManagement}
      />
      <RestrictedRoute
        session={session}
        path={UPSTREAM_INDUSTRY_EDIT}
        component={UpstreamIndustryManagement}
      />

      <RestrictedRoute
        session={session}
        path={THREAT_REGISTER}
        component={ThreatManagement}
      />
      <RestrictedRoute
        session={session}
        path={THREATS_LIST}
        component={ThreatManagement}
      />
      <RestrictedRoute
        session={session}
        path={THREAT_EDIT}
        component={ThreatManagement}
      />

      <RestrictedRoute
        session={session}
        path={ENVIRONMENT_REGISTER}
        component={EnvironmentManagement}
      />
      <RestrictedRoute
        session={session}
        path={ENVIRONMENT_LIST}
        component={EnvironmentManagement}
      />
      <RestrictedRoute
        session={session}
        path={ENVIRONMENT_EDIT}
        component={EnvironmentManagement}
      />

      <RestrictedRoute session={session} path={PROFILE} component={Profile} />
      <Redirect to="/" />
    </Switch>
  </App>
);

const RootWithSession = withSession(Routes);

export default RootWithSession;
