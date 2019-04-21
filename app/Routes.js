import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import App from './containers/App';
import withSession from './components/HOC/withSession';
import withAuth from './components/HOC/withAuth';
import {
  COUNTER,
  HOME,
  MINERAL_REGISTER,
  MINERALS_LIST,
  MINERAL_EDIT,
  MINE_REGISTER,
  MINES_LIST,
  MINE_EDIT,
  ELEMENT_REGISTER,
  ELEMENTS_LIST,
  ELEMENT_EDIT,
  GLOBAL_PRICE_REGISTER,
  GLOBAL_PRICES_LIST,
  GLOBAL_PRICE_EDIT,
  SECONDARY_SOURCE_REGISTER,
  SECONDARY_SOURCES_LIST,
  SECONDARY_SOURCE_EDIT,
  TOTAL_STATS_REGISTER,
  TOTAL_STATS_LIST,
  TOTAL_STATS_EDIT,
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
  USERS_LIST,
  USER_REGISTER,
  USER_EDIT,
  SIGNIN,
  PROFILE,
  ELEMENT_STATS_REGISTER,
  ELEMENTS_STATS_LIST,
  ELEMENT_STATS_EDIT
} from './constants/routes';

const HomePage = lazy(() => import('./containers/HomePage'));
const CounterPage = lazy(() => import('./containers/CounterPage'));
const Signin = lazy(() => import('./components/Auth/Signin'));
const AddNewElement = lazy(() => import('./components/Elements/AddNewElement'));
const AddNewElementFCS = lazy(() =>
  import('./components/Elements/AddNewElementFCS')
);
const ElementDetailForWorld = lazy(() =>
  import('./components/Elements/ElementDetailForWorld')
);
const InformationOfElement = lazy(() =>
  import('./components/Elements/InformationOfElement')
);
const InformationOfIran = lazy(() =>
  import('./components/Information/InformationOfIran')
);
const InformationOfWorld = lazy(() =>
  import('./components/Information/InformationOfWorld')
);
const UsersList = lazy(() => import('./components/Users/UsersList'));
const Profile = lazy(() => import('./components/Users/Profile'));
const MineralManagement = lazy(() =>
  import('./containers/admin/mineral/mineralManagement')
);
const MineManagement = lazy(() =>
  import('./containers/admin/mine/mineManagement')
);
const ElementManagement = lazy(() =>
  import('./containers/admin/element/elementManagement')
);
const GlobalPriceManagement = lazy(() =>
  import('./containers/admin/global-price/globalPriceManagement')
);
const SecondarySourceManagement = lazy(() =>
  import('./containers/admin/secondary-source/secondarySourceManagement')
);
const usersManagement = lazy(() =>
  import('./containers/admin/users/usersManagement')
);
const TotalStatsManagement = lazy(() =>
  import('./containers/admin/total-stats/totalStatsManagement')
);
const ExportManagement = lazy(() =>
  import('./containers/admin/export/exportManagement')
);
const ImportManagement = lazy(() =>
  import('./containers/admin/import/importManagement')
);
const WorldReservesManagement = lazy(() =>
  import('./containers/admin/world-reserves/worldReservesManagement')
);
const IranReservesManagement = lazy(() =>
  import('./containers/admin/iran-reserves/iranReservesManagement')
);
const WorldProductionManagement = lazy(() =>
  import('./containers/admin/world-production/worldProductionManagement')
);
const IranProductionManagement = lazy(() =>
  import('./containers/admin/iran-production/iranProductionManagement')
);
const WorldConsumptionManagement = lazy(() =>
  import('./containers/admin/world-consumption/worldConsumptionManagement')
);
const IranConsumptionManagement = lazy(() =>
  import('./containers/admin/iran-consumption/iranConsumptionManagement')
);
const DependenceIndustriesManagement = lazy(() =>
  import('./containers/admin/dependence-industries/dependenceIndustriesManagement')
);
const TechnologicalLevelManagement = lazy(() =>
  import('./containers/admin/technological-level/technologicalLevelManagement')
);
const SecondaryProductionManagement = lazy(() =>
  import('./containers/admin/secondary-production/secondaryProductionManagement')
);
const UpstreamIndustryManagement = lazy(() =>
  import('./containers/admin/upstream-industry/upstreamIndustryManagement')
);
const ThreatManagement = lazy(() =>
  import('./containers/admin/threat/threatManagement')
);
const EnvironmentManagement = lazy(() =>
  import('./containers/admin/environment/environmentManagement')
);
const SecondarySource = lazy(() =>
  import('./components/Elements/SecondarySource')
);
const ElementStatsManagement = lazy(() =>
  import('./containers/admin/element-stats/ElementStatsManagement')
);

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
    <Suspense fallback={<div>Loading...</div>}>
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

        <RestrictedRoute
          session={session}
          path={ELEMENT_STATS_REGISTER}
          component={ElementStatsManagement}
        />
        <RestrictedRoute
          session={session}
          path={ELEMENTS_STATS_LIST}
          component={ElementStatsManagement}
        />
        <RestrictedRoute
          session={session}
          path={ELEMENT_STATS_EDIT}
          component={ElementStatsManagement}
        />

        <RestrictedRoute session={session} path={PROFILE} component={Profile} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </App>
);

const RootWithSession = withSession(Routes);

export default RootWithSession;
