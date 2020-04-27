/**
 * BubbleCloud Component
 */
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'underscore';
import { GET_ELEMENT_MIX_STATS } from '../../queries/elementStats';
import { GET_INTERNATIONAL_RELATIONS } from '../../queries/internationalRelation';
import { GET_ENVIRONMENTS } from '../../queries/environment';
import { GET_THREATS } from '../../queries/threat';
import { GET_TECHNOLOGIES } from '../../queries/technology';
import { GET_INDUSTRIES } from '../../queries/industry';
import { GET_MINES } from '../../queries/mine';
import Loading from '../../components/General/Loading';
import { getQualityNumber, getStandardValueByUnit } from '../../utils/utility';
import { setElementsRates } from '../../actions/analysis';

const getDependencyToOtherCountry = elementStats => {
  const { importValue, consumptionValue } = elementStats;

  let value = 0;

  if (importValue && consumptionValue) {
    value = importValue / consumptionValue;
  }

  let rate = 1;

  switch (value) {
    case value > 0 && value <= 0.35:
      rate = 2;
      break;

    case value > 0.35 && value <= 0.75:
      rate = 3;
      break;

    case value > 0.75 && value <= 1:
      rate = 4;
      break;

    case value === 1:
      rate = 5;
      break;

    case value === 0:
    default:
      rate = 1;
  }

  return rate;
};

const threatInternationalRelation = (
  statsLocations,
  internationalRelations,
  iranStats
) => {
  let value = 0;

  statsLocations.forEach(stats => {
    if (stats.location !== 'IRN' && stats.location !== 'all') {
      const relation = internationalRelations.find(
        x => x.country === stats.location
      );

      if (relation && stats.importValue) {
        value +=
          (stats.importValue / iranStats.importValue) *
          getQualityNumber(relation.relationLevel);
      }
    }
  });

  let rate = 1;

  switch (value) {
    case value > 1 && value <= 2:
      rate = 5;
      break;

    case value > 2 && value <= 3:
      rate = 4;
      break;

    case value > 3 && value <= 4:
      rate = 3;
      break;

    case value > 4 && value <= 4.5:
      rate = 2;
      break;

    case value > 4.5 && value <= 5:
    default:
      rate = 1;
  }

  return rate;
};

const getStrategicImportance = (technologies, industries, element) => {
  const elementTechsSI = _.where(technologies, { element }).map(val =>
    getQualityNumber(val.strategicImportance)
  );

  let totalSI = 0;

  elementTechsSI.forEach(val => {
    totalSI += val;
  });

  const avrage =
    elementTechsSI.length > 0 ? totalSI / elementTechsSI.length : 0;

  const elementIndsSI = _.where(industries, { element }).map(val =>
    getQualityNumber(val.strategicImportance)
  );

  let totalIndsSI = 0;

  elementIndsSI.forEach(val => {
    totalIndsSI += val;
  });

  const avrageInds =
    elementIndsSI.length > 0 ? totalIndsSI / elementIndsSI.length : 0;

  const value = (avrage + avrageInds) / 2;

  let rate = 1;

  switch (value) {
    case value > 1.5 && value <= 2.5:
      rate = 2;
      break;

    case value > 2.5 && value <= 3.5:
      rate = 3;
      break;

    case value > 3.5 && value <= 4.5:
      rate = 4;
      break;

    case value > 4.5 && value <= 5:
      rate = 5;
      break;

    case value > 1 && value <= 1.5:
    default:
      rate = 1;
  }

  return rate;
};

const getMonopolyImpact = (statsLocations, worldStats) => {
  let firstOfWorld = 0;

  statsLocations.forEach(stats => {
    if (stats.location !== 'IRN' && stats.location !== 'all') {
      if (!firstOfWorld || firstOfWorld < stats.productionValue) {
        firstOfWorld = stats.productionValue;
      }
    }
  });

  let value = 0;

  if (firstOfWorld && worldStats && worldStats.productionValue) {
    value = firstOfWorld / worldStats.productionValue;
  }

  let rate = 1;

  switch (value) {
    case value > 0.2 && value <= 0.35:
      rate = 2;
      break;

    case value > 0.35 && value <= 0.5:
      rate = 3;
      break;

    case value > 0.5 && value <= 0.75:
      rate = 4;
      break;

    case value > 0.75:
      rate = 5;
      break;

    case value <= 0.2:
    default:
      rate = 1;
  }

  return rate;
};

const getPrimarySource = (iranStats, worldStats) => {
  const iranResource =
    iranStats.resourceStats && iranStats.resourceStats.primarySource
      ? iranStats.resourceStats.primarySource
      : 0;

  const worldResource =
    worldStats.resourceStats && worldStats.resourceStats.primarySource
      ? worldStats.resourceStats.primarySource
      : 1;

  const value = iranResource / worldResource;

  let rate = 1;

  switch (value) {
    case value > 0.005 && value <= 0.01:
      rate = 2;
      break;

    case value > 0.01 && value <= 0.025:
      rate = 3;
      break;

    case value > 0.025 && value <= 0.05:
      rate = 4;
      break;

    case value > 0.05:
      rate = 5;
      break;

    case value <= 0.005:
    default:
      rate = 1;
  }

  return rate;
};

const getIranConsumption = (iranStats, worldStats) => {
  const iranConsumption = iranStats.consumptionValue
    ? iranStats.consumptionValue
    : 0;

  const worldConsumption = worldStats.consumptionValue
    ? worldStats.consumptionValue
    : 1;

  const value = iranConsumption / worldConsumption;

  let rate = 1;

  switch (value) {
    case value > 0.005 && value <= 0.01:
      rate = 2;
      break;

    case value > 0.01 && value <= 0.025:
      rate = 3;
      break;

    case value > 0.025 && value <= 0.05:
      rate = 4;
      break;

    case value > 0.05:
      rate = 5;
      break;

    case value <= 0.005:
    default:
      rate = 1;
  }

  return rate;
};

const getEconomicValue = (gPrice, totalPrice) => {
  const value = gPrice / totalPrice;

  let rate = 1;

  switch (value) {
    case value > 0.0005 && value <= 0.001:
      rate = 2;
      break;

    case value > 0.001 && value <= 0.01:
      rate = 3;
      break;

    case value > 0.01 && value <= 1:
      rate = 4;
      break;

    case value > 1:
      rate = 5;
      break;

    case value <= 0.0005:
    default:
      rate = 1;
  }

  return rate;
};

const getExportPotential = iranStats => {
  const iranProduction = iranStats.productionValue
    ? iranStats.productionValue
    : 0;

  const iranConsumption = iranStats.consumptionValue
    ? iranStats.consumptionValue
    : 1;

  const value = iranProduction / iranConsumption;

  let rate = 1;

  switch (value) {
    case value >= 1 && value <= 2:
      rate = 2;
      break;

    case value > 2 && value <= 3:
      rate = 3;
      break;

    case value > 3 && value <= 5:
      rate = 4;
      break;

    case value > 5:
      rate = 5;
      break;

    case value < 1:
    default:
      rate = 1;
  }

  return rate;
};

const getImpactOnIndustries = (industries, element) => {
  const elementIndsES = _.where(industries, { element }).map(val =>
    getQualityNumber(val.economicSignificance)
  );

  let totalIndsES = 0;

  elementIndsES.forEach(val => {
    totalIndsES += val;
  });

  const value =
    elementIndsES.length > 0 ? totalIndsES / elementIndsES.length : 0;

  let rate = 1;

  switch (value) {
    case value > 1.5 && value <= 2.5:
      rate = 2;
      break;

    case value > 2.5 && value <= 3.5:
      rate = 3;
      break;

    case value > 3.5 && value <= 4.5:
      rate = 4;
      break;

    case value > 4.5 && value <= 5:
      rate = 5;
      break;

    case value > 1 && value <= 1.5:
    default:
      rate = 1;
  }

  return rate;
};

const getAccessToSecondaryResource = iranStats => {
  const secondarySourceRate =
    iranStats.resourceStats && iranStats.resourceStats.secondarySource
      ? getQualityNumber(iranStats.resourceStats.secondarySource)
      : 0;

  return secondarySourceRate;
};

const getJobCreationRate = (industries, element) => {
  const elementIndsES = _.where(industries, { element }).map(val =>
    getQualityNumber(val.jobCreationRate)
  );

  let totalIndsES = 0;

  elementIndsES.forEach(val => {
    totalIndsES += val;
  });

  return elementIndsES.length > 0 ? totalIndsES / elementIndsES.length : 0;
};

const getImpactPreventLocalDeprivation = (mines, element) => {
  const elementImpacts = _.where(mines, { element }).map(val =>
    getQualityNumber(val.impactPreventLocalDeprivation)
  );

  let totalImpacts = 0;

  elementImpacts.forEach(val => {
    totalImpacts += val;
  });

  return elementImpacts.length > 0 ? totalImpacts / elementImpacts.length : 0;
};

const getStatesDispersion = (mines, element) => {
  const currElMines = _.where(mines, { element });

  let states = _.pluck(currElMines, 'location');

  states = _.uniq(states);

  const value = states.length;

  let rate = 1;

  if (value < 1) {
    rate = 1;
  } else if (value > 5) {
    rate = 5;
  } else {
    rate = value;
  }

  return rate;
};

const getTechnplogyRestriction = (technologies, element) => {
  const elementAvailability = _.where(technologies, { element }).map(val =>
    getQualityNumber(val.availabilityInIran)
  );

  let totalAvailability = 0;

  elementAvailability.forEach(val => {
    totalAvailability += val;
  });

  return elementAvailability.length > 0
    ? totalAvailability / elementAvailability.length
    : 0;
};

const getDisabilityOnSecondaryProduction = iranStats => {
  const iranProduction = iranStats.productionValue
    ? iranStats.productionValue
    : 1;

  const iranSecondaryProduction = iranStats.secondaryProductionValue
    ? iranStats.secondaryProductionValue
    : 0;

  const value = iranProduction / iranSecondaryProduction;

  let rate = 5;

  switch (value) {
    case value > 0.1 && value <= 0.2:
      rate = 1;
      break;

    case value > 0.05 && value <= 0.1:
      rate = 2;
      break;

    case value > 0.01 && value <= 0.05:
      rate = 3;
      break;

    case value > 0 && value <= 0.01:
      rate = 4;
      break;

    case value === 0:
    default:
      rate = 5;
  }

  return rate;
};

class AnalysisRate extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      statsByElements: null,
      internationalRelations: null,
      environments: null,
      threats: null,
      technologies: null,
      industries: null,
      mines: null
    };

    this.factors = {
      develop: {
        P: 0.1,
        E: 0.2,
        S: 0.2,
        T: 0.1,
        En: 0.3,
        L: 0.1
      },
      strategic: {
        P: 0.3,
        E: 0.1,
        S: 0.1,
        T: 0.2,
        En: 0.1,
        L: 0.2
      },
      economic: {
        P: 0.1,
        E: 0.3,
        S: 0.2,
        T: 0.1,
        En: 0.1,
        L: 0.2
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const currState = this.state;

    let isEqual = true;

    Object.keys(this.state).forEach(state => {
      if (!_.isEqual(currState[state], prevState[state])) {
        isEqual = false;
      }
    });

    if (!isEqual) {
      let isNull = false;

      Object.keys(this.state).forEach(state => {
        if (_.isNull(currState[state])) {
          isNull = true;
        }
      });

      /**
       * after completed all requested for first time
       */
      if (!isNull) {
        this.createBubbleData();
      }
    }

    const { analysisFactor, indicatorsFactor } = this.props;

    if (
      !_.isEqual(prevProps.analysisFactor, analysisFactor) ||
      !_.isEqual(prevProps.indicatorsFactor, indicatorsFactor)
    ) {
      this.createBubbleData();
    }
  }

  createBubbleData() {
    const {
      statsByElements,
      internationalRelations,
      technologies,
      industries,
      threats,
      mines,
      environments
    } = this.state;

    const {
      analysisFactor = 'strategic',
      indicatorsFactor,
      setElementsRatesDis
    } = this.props;

    const elements = _.groupBy(statsByElements, stats => stats.element);

    console.log('--------analysisFactor--------', analysisFactor);
    console.log('--------elements--------', elements);
    console.log('--------indicatorsFactor--------', indicatorsFactor);

    let totalPrice = 0;

    const {
      p1: fp1,
      p2: fp2,
      p3: fp3,
      p4: fp4,
      e1: fe1,
      e2: fe2,
      e3: fe3,
      e4: fe4,
      e5: fe5,
      e6: fe6,
      e7: fe7,
      s1: fs1,
      s2: fs2,
      s3: fs3,
      t1: ft1,
      t2: ft2,
      en1: fen1,
      en2: fen2,
      en3: fen3,
      en4: fen4,
      en5: fen5,
      l1: fl1,
      l2: fl2,
      l3: fl3
    } = indicatorsFactor;

    _.each(elements, statsByLocation => {
      const first = statsByLocation[0];

      if (first && first.price && first.price.price && first.price.unit) {
        totalPrice +=
          first.price.price / getStandardValueByUnit(1, first.price.unit);
      }
    });

    const elementsRate = {};

    const currFactors = this.factors[analysisFactor];

    const { P, E, S, T, En, L } = currFactors;

    _.each(elements, (statsByLocation, element) => {
      const iranStats = statsByLocation.find(x => x.location === 'IRN');

      const worldStats = statsByLocation.find(x => x.location === 'all');

      let p1 = 1;

      if (iranStats) {
        p1 = getDependencyToOtherCountry(iranStats);
      }

      let p2 = 1;

      if (iranStats && iranStats.importValue && statsByLocation.length > 1) {
        p2 = threatInternationalRelation(
          statsByLocation,
          internationalRelations,
          iranStats
        );
      }

      const p3 = getStrategicImportance(technologies, industries, element);

      let p4 = 1;

      if (worldStats) {
        p4 = getMonopolyImpact(statsByLocation, worldStats);
      }

      let e1 = 1;

      if (worldStats && iranStats) {
        e1 = getPrimarySource(iranStats, worldStats);
      }

      let e2 = 2;

      const first = statsByLocation[0];

      if (first && first.price && first.price.price && first.price.unit) {
        const gPrice =
          first.price.price / getStandardValueByUnit(1, first.price.unit);

        e2 = getEconomicValue(gPrice, totalPrice);
      }

      let e3 = 1;

      if (worldStats && iranStats) {
        e3 = getIranConsumption(iranStats, worldStats);
      }

      let e4 = 1;

      if (worldStats && iranStats) {
        e4 = getExportPotential(iranStats);
      }

      const threat = threats.find(x => x.element === element);

      let e5 = 1;

      if (threat && threat.diffRawMaterialValueAProcessedProduct) {
        e5 = getQualityNumber(threat.diffRawMaterialValueAProcessedProduct);
      }

      const e6 = getImpactOnIndustries(industries, element);

      let e7 = 1;

      if (iranStats) {
        e7 = getAccessToSecondaryResource(iranStats);
      }

      const s1 = getJobCreationRate(industries, element);

      const s2 = getStatesDispersion(mines, element);

      const s3 = getImpactPreventLocalDeprivation(mines, element);

      const t1 = getTechnplogyRestriction(technologies, element);

      let t2 = 5;

      if (iranStats) {
        t2 = getDisabilityOnSecondaryProduction(iranStats);
      }

      const environment = environments.find(x => x.element === element);

      let en1 = 1;

      if (environment && environment.waterConsumption) {
        en1 = getQualityNumber(environment.waterConsumption);
      }

      let en2 = 1;

      if (environment && environment.energyConsumption) {
        en2 = getQualityNumber(environment.energyConsumption);
      }

      let en3 = 1;

      if (environment && environment.greenhouseGasEmissions) {
        en3 = getQualityNumber(environment.greenhouseGasEmissions);
      }

      let en4 = 1;

      if (environment && environment.risksWasteAWasteWater) {
        en4 = getQualityNumber(environment.risksWasteAWasteWater);
      }

      let en5 = 1;

      if (environment && environment.productionProcessRisksHuman) {
        en5 = getQualityNumber(environment.productionProcessRisksHuman);
      }

      let l1 = 1;

      if (threat && threat.effectivenessSanctions) {
        l1 = getQualityNumber(threat.effectivenessSanctions);
      }

      let l2 = 1;

      if (threat && threat.impactTariffs) {
        l2 = getQualityNumber(threat.impactTariffs);
      }

      let l3 = 1;

      if (threat && threat.levelGovernmentalSupport) {
        l3 = getQualityNumber(threat.levelGovernmentalSupport);
      }

      elementsRate[element] = {
        finalRate:
          (p1 * fp1 + p2 * fp2 + p3 * fp3 + p4 * fp4) * P +
          (e1 * fe1 +
            e2 * fe2 +
            e3 * fe3 +
            e4 * fe4 +
            e5 * fe5 +
            e6 * fe6 +
            e7 * fe7) *
            E +
          (s1 * fs1 + s2 * fs2 + s3 * fs3) * S +
          (t1 * ft1 + t2 * ft2) * T +
          (en1 * fen1 + en2 * fen2 + en3 * fen3 + en4 * fen4 + en5 * fen5) *
            En +
          (l1 * fl1 + l2 * fl2 + l3 * fl3) * L,
        p1,
        p2,
        p3,
        p4,
        e1,
        e2,
        e3,
        e4,
        e5,
        e6,
        e7,
        s1,
        s2,
        s3,
        t1,
        t2,
        en1,
        en2,
        en3,
        en4,
        en5,
        l1,
        l2,
        l3
      };
    });

    console.log('--------elementsRate----------', elementsRate);

    setElementsRatesDis(elementsRate);
  }

  render() {
    const {
      statsByElements,
      internationalRelations,
      environments,
      threats,
      technologies,
      industries,
      mines
    } = this.state;

    return (
      <div className="information-analysis-container">
        <Query
          query={GET_ELEMENT_MIX_STATS}
          variables={{
            offset: -1,
            first: 0,
            year: 2018
          }}
          onCompleted={data => {
            if (!_.isEqual(data.statsByElements, statsByElements)) {
              this.setState({ statsByElements: data.statsByElements });
            }
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data) console.log(data);

            return null;
          }}
        </Query>

        <Query
          query={GET_INTERNATIONAL_RELATIONS}
          variables={{
            offset: -1,
            first: 0
          }}
          onCompleted={data => {
            if (
              !_.isEqual(
                data.searchInternationalRelations.internationalRelations,
                internationalRelations
              )
            ) {
              this.setState({
                internationalRelations:
                  data.searchInternationalRelations.internationalRelations
              });
            }
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data) console.log(data);

            return null;
          }}
        </Query>

        <Query
          query={GET_ENVIRONMENTS}
          variables={{
            offset: -1,
            first: 0
          }}
          onCompleted={data => {
            if (
              !_.isEqual(data.searchEnvironments.environments, environments)
            ) {
              this.setState({
                environments: data.searchEnvironments.environments
              });
            }
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data) console.log(data);

            return null;
          }}
        </Query>

        <Query
          query={GET_THREATS}
          variables={{
            offset: -1,
            first: 0
          }}
          onCompleted={data => {
            if (!_.isEqual(data.searchThreats.threats, threats)) {
              this.setState({ threats: data.searchThreats.threats });
            }
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data) console.log(data);

            return null;
          }}
        </Query>

        <Query
          query={GET_TECHNOLOGIES}
          variables={{
            offset: -1,
            first: 0
          }}
          onCompleted={data => {
            if (
              !_.isEqual(data.searchTechnologies.technologies, technologies)
            ) {
              this.setState({
                technologies: data.searchTechnologies.technologies
              });
            }
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data) console.log(data);

            return null;
          }}
        </Query>

        <Query
          query={GET_INDUSTRIES}
          variables={{
            offset: -1,
            first: 0
          }}
          onCompleted={data => {
            if (!_.isEqual(data.searchIndustries.industries, industries)) {
              this.setState({ industries: data.searchIndustries.industries });
            }
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data) console.log(data);

            return null;
          }}
        </Query>

        <Query
          query={GET_MINES}
          variables={{
            offset: -1,
            first: 0
          }}
          onCompleted={data => {
            if (!_.isEqual(data.searchMine.mines, mines)) {
              this.setState({ mines: data.searchMine.mines });
            }
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data) console.log(data);

            return null;
          }}
        </Query>
      </div>
    );
  }
}

AnalysisRate.defaultProps = {
  indicatorsFactor: {
    p1: 0.3,
    p2: 0.2,
    p3: 0.3,
    p4: 0.2,
    e1: 0.1,
    e2: 0.2,
    e3: 0.1,
    e4: 0.15,
    e5: 0.15,
    e6: 0.2,
    e7: 0.1,
    s1: 0.5,
    s2: 0.2,
    s3: 0.3,
    t1: 0.6,
    t2: 0.4,
    en1: 0.3,
    en2: 0.1,
    en3: 0.2,
    en4: 0.2,
    en5: 0.2,
    l1: 0.5,
    l2: 0.2,
    l3: 0.3
  }
};

const mapDispatchToProps = dispatch => ({
  setElementsRatesDis: rates => dispatch(setElementsRates(rates))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AnalysisRate));
