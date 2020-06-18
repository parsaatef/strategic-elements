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
  MINERAL,
  MINE_REGISTER,
  MINES_LIST,
  MINE_EDIT,
  MINE,
  ELEMENT_REGISTER,
  ELEMENTS_LIST,
  ELEMENT_EDIT,
  GLOBAL_PRICE_REGISTER,
  GLOBAL_PRICES_LIST,
  GLOBAL_PRICE_EDIT,
  GLOBAL_PRICE,
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
  INDUSTRY_REGISTER,
  INDUSTRY_LIST,
  INDUSTRY_EDIT,
  TECHNOLOGICAL_LEVEL_REGISTER,
  TECHNOLOGICAL_LEVEL_LIST,
  TECHNOLOGICAL_LEVEL_EDIT,
  TECHNOLOGICAL_LEVEL,
  SECONDARY_PRODUCTION_REGISTER,
  SECONDARY_PRODUCTION_LIST,
  SECONDARY_PRODUCTION_EDIT,
  UPSTREAM_INDUSTRY_REGISTER,
  UPSTREAM_INDUSTRY_LIST,
  UPSTREAM_INDUSTRY_EDIT,
  UPSTREAM_INDUSTRY,
  DEPENDENCE_INDUSTRIES,
  THREAT_REGISTER,
  THREATS_LIST,
  THREAT_EDIT,
  THREAT,
  ENVIRONMENT_REGISTER,
  ENVIRONMENT_LIST,
  ENVIRONMENT_EDIT,
  ENVIRONMENT,
  INFORMATION_STATS_DETAIL,
  ELEMENT_INFORMATION,
  SECONDARY_SOURCE,
  INFORMATION_OF_WORLD,
  USERS_LIST,
  USER_REGISTER,
  USER_EDIT,
  SIGNIN,
  ELEMENT_STATS_REGISTER,
  ELEMENTS_STATS_LIST,
  ELEMENT_STATS_EDIT,
  ANALYSIS_INTRO,
  ANALYSIS_FACTOR,
  ANALYSIS_ELEMENT,
  ANALYSIS_RELATED_CHART,
  ADMIN,
  INTERNATIONAL_RELATION_REGISTER,
  INTERNATIONAL_RELATIONS_LIST,
  INTERNATIONAL_RELATION_EDIT,
  PRODUCTION
} from './constants/routes';
import { Alert } from 'react-bootstrap';

/**
 * Front End Routers
 */
const HomePage = lazy(() => import('./containers/HomePage'));
const CounterPage = lazy(() => import('./containers/CounterPage'));
const Signin = lazy(() => import('./components/Auth/Signin'));

const AnalysisIntro = lazy(() => import('./containers/analysis/AnalysisIntro'));

const AnalysisFactor = lazy(() =>
  import('./containers/analysis/AnalysisFactor')
);

const AnalysisElement = lazy(() =>
  import('./containers/analysis/AnalysisElement')
);

const RelatedChart = lazy(() => import('./containers/analysis/RelatedChart'));

const Admin = lazy(() => import('./containers/admin/Admin'));

const ElementDetailForWorld = lazy(() =>
  import('./components/Elements/ElementDetailForWorld')
);
const InformationOfElement = lazy(() =>
  import('./components/Elements/InformationOfElement')
);

const InformationOfWorld = lazy(() =>
  import('./components/Information/InformationOfWorld')
);

const EnvironmentManagement = lazy(() =>
  import('./containers/admin/environment/environmentManagement')
);

const SecondarySource = lazy(() =>
  import('./components/Elements/SecondarySource')
);

const UpstreamIndustry = lazy(() =>
  import('./components/Elements/UpstreamIndustry')
);

const Environment = lazy(() => import('./components/Elements/Environment'));

const Threat = lazy(() => import('./components/Elements/Threat'));

const TechnologicalLevel = lazy(() =>
  import('./components/Elements/TechnologicalLevel')
);

const DependenceIndustries = lazy(() =>
  import('./components/Elements/DependenceIndustries')
);

const Mine = lazy(() => import('./components/Elements/Mines'));

const Mineral = lazy(() => import('./components/Elements/Mineral'));

const GlobalPrice = lazy(() => import('./components/Elements/GlobalPrice'));

const Production = lazy(() => import('./components/Elements/Production'));

/**
 * Admin Routers
 */
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
const ResourceManagement = lazy(() =>
  import('./containers/admin/resource/ResourceManagement')
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
  import('./containers/admin/industry/IndustryManagement')
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
const InternationalRelationManagement = lazy(() =>
  import('./containers/admin/international-relation/InternationalRelationManagement')
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

const AdminRoute = (props) => {

  const { session } = props;

  const currentUser =
    session && session.getCurrentUser ? session.getCurrentUser : {};

  if (currentUser && currentUser.role === 'admin') {
    return <RestrictedRoute {...props} />;
  }

  return (
    <section style={{
      margin: '30px'
    }}>
      <Alert variant="danger">
        شما به این صفحه دسترسی ندارید
      </Alert>
    </section>
  )
}

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
          path={INFORMATION_STATS_DETAIL}
          component={ElementDetailForWorld}
        />
        <RestrictedRoute
          session={session}
          path={ELEMENT_INFORMATION}
          component={InformationOfElement}
        />

        <RestrictedRoute
          session={session}
          path={SECONDARY_SOURCE}
          component={SecondarySource}
        />

        <RestrictedRoute
          session={session}
          path={INFORMATION_OF_WORLD}
          component={InformationOfWorld}
        />

        <AdminRoute
          session={session}
          path={USER_REGISTER}
          component={usersManagement}
        />
        <AdminRoute
          session={session}
          path={USERS_LIST}
          component={usersManagement}
        />
        <AdminRoute
          session={session}
          path={USER_EDIT}
          component={usersManagement}
        />

        <AdminRoute
          session={session}
          path={MINERAL_REGISTER}
          component={MineralManagement}
        />
        <AdminRoute
          session={session}
          path={MINERALS_LIST}
          component={MineralManagement}
        />
        <AdminRoute
          session={session}
          path={MINERAL_EDIT}
          component={MineralManagement}
        />

        <RestrictedRoute session={session} path={MINERAL} component={Mineral} />

        <AdminRoute
          session={session}
          path={MINE_REGISTER}
          component={MineManagement}
        />

        <AdminRoute
          session={session}
          path={MINES_LIST}
          component={MineManagement}
        />
        <AdminRoute
          session={session}
          path={MINE_EDIT}
          component={MineManagement}
        />

        <RestrictedRoute session={session} path={MINE} component={Mine} />

        <AdminRoute
          session={session}
          path={ELEMENT_REGISTER}
          component={ElementManagement}
        />
        <AdminRoute
          session={session}
          path={ELEMENTS_LIST}
          component={ElementManagement}
        />
        <AdminRoute
          session={session}
          path={ELEMENT_EDIT}
          component={ElementManagement}
        />

        <AdminRoute
          session={session}
          path={GLOBAL_PRICE_REGISTER}
          component={GlobalPriceManagement}
        />
        <AdminRoute
          session={session}
          path={GLOBAL_PRICES_LIST}
          component={GlobalPriceManagement}
        />
        <AdminRoute
          session={session}
          path={GLOBAL_PRICE_EDIT}
          component={GlobalPriceManagement}
        />
        <RestrictedRoute
          session={session}
          path={GLOBAL_PRICE}
          component={GlobalPrice}
        />

        <AdminRoute
          session={session}
          path={SECONDARY_SOURCE_REGISTER}
          component={ResourceManagement}
        />
        <AdminRoute
          session={session}
          path={SECONDARY_SOURCES_LIST}
          component={ResourceManagement}
        />
        <AdminRoute
          session={session}
          path={SECONDARY_SOURCE_EDIT}
          component={ResourceManagement}
        />

        <AdminRoute
          session={session}
          path={TOTAL_STATS_REGISTER}
          component={TotalStatsManagement}
        />
        <AdminRoute
          session={session}
          path={TOTAL_STATS_LIST}
          component={TotalStatsManagement}
        />
        <AdminRoute
          session={session}
          path={TOTAL_STATS_EDIT}
          component={TotalStatsManagement}
        />

        <AdminRoute
          session={session}
          path={EXPORT_REGISTER}
          component={ExportManagement}
        />
        <AdminRoute
          session={session}
          path={EXPORT_LIST}
          component={ExportManagement}
        />
        <AdminRoute
          session={session}
          path={EXPORT_EDIT}
          component={ExportManagement}
        />

        <AdminRoute
          session={session}
          path={IMPORT_REGISTER}
          component={ImportManagement}
        />
        <AdminRoute
          session={session}
          path={IMPORT_LIST}
          component={ImportManagement}
        />
        <AdminRoute
          session={session}
          path={IMPORT_EDIT}
          component={ImportManagement}
        />

        <AdminRoute
          session={session}
          path={WORLD_RESERVES_REGISTER}
          component={WorldReservesManagement}
        />
        <AdminRoute
          session={session}
          path={WORLD_RESERVES_LIST}
          component={WorldReservesManagement}
        />
        <AdminRoute
          session={session}
          path={WORLD_RESERVES_EDIT}
          component={WorldReservesManagement}
        />

        <AdminRoute
          session={session}
          path={IRAN_RESERVES_REGISTER}
          component={IranReservesManagement}
        />
        <AdminRoute
          session={session}
          path={IRAN_RESERVES_LIST}
          component={IranReservesManagement}
        />
        <AdminRoute
          session={session}
          path={IRAN_RESERVES_EDIT}
          component={IranReservesManagement}
        />

        <AdminRoute
          session={session}
          path={WORLD_PRODUCTION_REGISTER}
          component={WorldProductionManagement}
        />
        <AdminRoute
          session={session}
          path={WORLD_PRODUCTION_LIST}
          component={WorldProductionManagement}
        />
        <AdminRoute
          session={session}
          path={WORLD_PRODUCTION_EDIT}
          component={WorldProductionManagement}
        />

        <AdminRoute
          session={session}
          path={IRAN_PRODUCTION_REGISTER}
          component={IranProductionManagement}
        />
        <AdminRoute
          session={session}
          path={IRAN_PRODUCTION_LIST}
          component={IranProductionManagement}
        />
        <AdminRoute
          session={session}
          path={IRAN_PRODUCTION_EDIT}
          component={IranProductionManagement}
        />

        <AdminRoute
          session={session}
          path={WORLD_CONSUMPTION_REGISTER}
          component={WorldConsumptionManagement}
        />
        <AdminRoute
          session={session}
          path={WORLD_CONSUMPTION_LIST}
          component={WorldConsumptionManagement}
        />
        <AdminRoute
          session={session}
          path={WORLD_CONSUMPTION_EDIT}
          component={WorldConsumptionManagement}
        />

        <AdminRoute
          session={session}
          path={IRAN_CONSUMPTION_REGISTER}
          component={IranConsumptionManagement}
        />
        <AdminRoute
          session={session}
          path={IRAN_CONSUMPTION_LIST}
          component={IranConsumptionManagement}
        />
        <AdminRoute
          session={session}
          path={IRAN_CONSUMPTION_EDIT}
          component={IranConsumptionManagement}
        />

        <AdminRoute
          exact
          session={session}
          path={INDUSTRY_REGISTER}
          component={DependenceIndustriesManagement}
        />
        <AdminRoute
          exact
          session={session}
          path={INDUSTRY_LIST}
          component={DependenceIndustriesManagement}
        />
        <AdminRoute
          exact
          session={session}
          path={INDUSTRY_EDIT}
          component={DependenceIndustriesManagement}
        />

        {/* <RestrictedRoute
          exact
          session={session}
          path={INDUSTRY}
          component={DependenceIndustries}
        /> */}

        <AdminRoute
          session={session}
          path={TECHNOLOGICAL_LEVEL_REGISTER}
          component={TechnologicalLevelManagement}
        />
        <AdminRoute
          session={session}
          path={TECHNOLOGICAL_LEVEL_LIST}
          component={TechnologicalLevelManagement}
        />
        <AdminRoute
          session={session}
          path={TECHNOLOGICAL_LEVEL_EDIT}
          component={TechnologicalLevelManagement}
        />

        <RestrictedRoute
          session={session}
          path={TECHNOLOGICAL_LEVEL}
          component={TechnologicalLevel}
        />

        <AdminRoute
          session={session}
          path={SECONDARY_PRODUCTION_REGISTER}
          component={SecondaryProductionManagement}
        />
        <AdminRoute
          session={session}
          path={SECONDARY_PRODUCTION_LIST}
          component={SecondaryProductionManagement}
        />
        <AdminRoute
          session={session}
          path={SECONDARY_PRODUCTION_EDIT}
          component={SecondaryProductionManagement}
        />

        <AdminRoute
          session={session}
          path={UPSTREAM_INDUSTRY_REGISTER}
          component={UpstreamIndustryManagement}
        />
        <AdminRoute
          session={session}
          path={UPSTREAM_INDUSTRY_LIST}
          component={UpstreamIndustryManagement}
        />
        <AdminRoute
          session={session}
          path={UPSTREAM_INDUSTRY_EDIT}
          component={UpstreamIndustryManagement}
        />

        <RestrictedRoute
          session={session}
          path={UPSTREAM_INDUSTRY}
          component={UpstreamIndustry}
        />

        <RestrictedRoute
          session={session}
          path={DEPENDENCE_INDUSTRIES}
          component={DependenceIndustries}
        />

        <AdminRoute
          session={session}
          path={THREAT_REGISTER}
          component={ThreatManagement}
        />
        <AdminRoute
          session={session}
          path={THREATS_LIST}
          component={ThreatManagement}
        />
        <AdminRoute
          session={session}
          path={THREAT_EDIT}
          component={ThreatManagement}
        />

        <AdminRoute
          session={session}
          path={INTERNATIONAL_RELATION_REGISTER}
          component={InternationalRelationManagement}
        />
        <AdminRoute
          session={session}
          path={INTERNATIONAL_RELATIONS_LIST}
          component={InternationalRelationManagement}
        />
        <AdminRoute
          session={session}
          path={INTERNATIONAL_RELATION_EDIT}
          component={InternationalRelationManagement}
        />

        <RestrictedRoute session={session} path={THREAT} component={Threat} />

        <AdminRoute
          exact
          session={session}
          path={ENVIRONMENT_REGISTER}
          component={EnvironmentManagement}
        />
        <AdminRoute
          exact
          session={session}
          path={ENVIRONMENT_LIST}
          component={EnvironmentManagement}
        />
        <AdminRoute
          exact
          session={session}
          path={ENVIRONMENT_EDIT}
          component={EnvironmentManagement}
        />

        <RestrictedRoute
          exact
          session={session}
          path={ENVIRONMENT}
          component={Environment}
        />

        <AdminRoute
          session={session}
          path={ELEMENT_STATS_REGISTER}
          component={ElementStatsManagement}
        />
        <AdminRoute
          session={session}
          path={ELEMENTS_STATS_LIST}
          component={ElementStatsManagement}
        />

        <AdminRoute
          session={session}
          path={ELEMENT_STATS_EDIT}
          component={ElementStatsManagement}
        />

        <RestrictedRoute
          session={session}
          path={ANALYSIS_INTRO}
          component={AnalysisIntro}
        />

        <RestrictedRoute
          exact
          session={session}
          path={ANALYSIS_FACTOR}
          component={AnalysisFactor}
        />

        <RestrictedRoute
          exact
          session={session}
          path={ANALYSIS_ELEMENT}
          component={AnalysisElement}
        />

        <RestrictedRoute
          exact
          session={session}
          path={ANALYSIS_RELATED_CHART}
          component={RelatedChart}
        />

        <AdminRoute
          exact
          session={session}
          path={ADMIN}
          component={Admin}
        />

        <RestrictedRoute
          exact
          session={session}
          path={PRODUCTION}
          component={Production}
        />

        <Redirect to="/" />
      </Switch>
    </Suspense>
  </App>
);

const RootWithSession = withSession(Routes);

export default RootWithSession;
