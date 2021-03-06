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

const getDependencyToOtherCountry = (elementStats, worldStats) => {
  const { consumptionValue, unit } = elementStats;
  const { importValue, unit: wrUnit } = worldStats;

  let value = 0;

  if (importValue && consumptionValue) {
    value = getStandardValueByUnit(importValue, wrUnit) / getStandardValueByUnit(consumptionValue, unit);
  }

  let rate = 1;

  if (value > 0 && value < 0.35) {
    rate = 2;
  } else if (value >= 0.35 && value < 0.75) {
    rate = 3;
  } else if (value >= 0.75 && value < 1) {
    rate = 4;
  } else if (value === 1) {
    rate = 5;
  } else if (value === 0) {
    rate = 1;
  }

  return rate;
};

const threatInternationalRelation = (
  statsLocations,
  internationalRelations,
  worldStats
) => {
  let value = 0;

  statsLocations.forEach(stats => {
    if (stats.location !== 'IRN' && stats.location !== 'all') {
      const relation = internationalRelations.find(
        x => x.country === stats.location
      );

      if (relation && stats.importValue) {
        value +=
          (getStandardValueByUnit(stats.importValue, stats.unit) / getStandardValueByUnit(worldStats.importValue, worldStats.unit)) *
          getQualityNumber(relation.relationLevel);
      }
    }
  });

  let rate = 1;

  if (value >= 1 && value < 2) {
    rate = 5;
  } else if (value >= 2 && value < 3) {
    rate = 4;
  } else if (value >= 3 && value < 4) {
    rate = 3;
  } else if (value >= 4 && value < 4.5) {
    rate = 2;
  } else if (value >= 4.5 && value <= 5) {
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

  if (value >= 1.5 && value < 2.5) {
    rate = 2;
  } else if (value >= 2.5 && value < 3.5) {
    rate = 3;
  } else if (value >= 3.5 && value < 4.5) {
    rate = 4;
  } else if (value >= 4.5 && value <= 5) {
    rate = 5;
  } else if (value >= 1 && value < 1.5) {
    rate = 1;
  }

  return rate;
};

const getMonopolyImpact = (statsLocations, worldStats) => {
  let firstOfWorld = 0;

  statsLocations.forEach(stats => {
    if (stats.location !== 'IRN' && stats.location !== 'all') {
      const currPValue = getStandardValueByUnit(stats.productionValue, stats.unit);
      if (!firstOfWorld || firstOfWorld < currPValue) {
        firstOfWorld = currPValue;
      }
    }
  });

  let value = 0;

  if (firstOfWorld && worldStats && worldStats.productionValue) {
    value = firstOfWorld / getStandardValueByUnit(worldStats.productionValue, worldStats.unit);
  }

  let rate = 1;

  if (value >= 0.2 && value < 0.35) {
    rate = 2;
  } else if (value >= 0.35 && value < 0.5) {
    rate = 3;
  } else if (value >= 0.5 && value < 0.7) {
    rate = 4;
  } else if (value >= 0.7) {
    rate = 5;
  } else if (value < 0.2) {
    rate = 1;
  }

  return rate;
};

const getPrimarySource = (iranStats, worldStats) => {

  const irUnit = iranStats.resourceStats && iranStats.resourceStats.unit ? iranStats.resourceStats.unit : "ton";

  const iranResource =
    iranStats.resourceStats && iranStats.resourceStats.primarySource
      ? iranStats.resourceStats.primarySource
      : 0;

      const wrUnit = worldStats.resourceStats && worldStats.resourceStats.unit ? worldStats.resourceStats.unit : "ton";

  const worldResource =
    worldStats.resourceStats && worldStats.resourceStats.primarySource
      ? worldStats.resourceStats.primarySource
      : 1;

  const value = getStandardValueByUnit(iranResource, irUnit) / getStandardValueByUnit(worldResource, wrUnit); console.log("-----value----", value, iranStats.element);

  let rate = 1;

  if (value >= 0.005 && value < 0.01) {
    rate = 2;
  } else if (value >= 0.01 && value < 0.025) {
    rate = 3;
  } else if (value >= 0.025 && value < 0.05) {
    rate = 4;
  } else if (value >= 0.05) {
    rate = 5;
  } else if (value < 0.005) {
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

  const value = getStandardValueByUnit(iranConsumption, iranStats.unit) / getStandardValueByUnit(worldConsumption, worldStats.unit);

  let rate = 1;

  if (value >= 0.005 && value < 0.01) {
    rate = 2;
  } else if (value >= 0.01 && value < 0.025) {
    rate = 3;
  } else if (value >= 0.025 && value < 0.05) {
    rate = 4;
  } else if (value >= 0.05) {
    rate = 5;
  } else if (value < 0.005) {
    rate = 1;
  }

  return rate;
};

const getEconomicValue = (gPrice, totalPrice) => {
  const value = gPrice / totalPrice;

  let rate = 1;

  if (value >= 0.0005 && value < 0.001) {
    rate = 2;
  } else if (value >= 0.001 && value < 0.01) {
    rate = 3;
  } else if (value >= 0.01 && value < 1) {
    rate = 4;
  } else if (value >= 1) {
    rate = 5;
  } else if (value < 0.0005) {
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

  if (value >= 1 && value < 2) {
    rate = 2;
  } else if (value >= 2 && value < 3) {
    rate = 3;
  } else if (value >= 3 && value < 5) {
    rate = 4;
  } else if (value >= 5) {
    rate = 5;
  } else if (value < 1) {
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

  if (value >= 1.5 && value < 2.5) {
    rate = 2;
  } else if (value >= 2.5 && value < 3.5) {
    rate = 3;
  } else if (value >= 3.5 && value < 4.5) {
    rate = 4;
  } else if (value >= 4.5 && value <= 5) {
    rate = 5;
  } else if (value >= 1 && value < 1.5) {
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

  return elementIndsES.length > 0 ? Math.round(totalIndsES / elementIndsES.length) : 0;
};

const getImpactPreventLocalDeprivation = (mines, element) => {
  const elementImpacts = _.where(mines, { element }).map(val =>
    getQualityNumber(val.impactPreventLocalDeprivation)
  );

  let totalImpacts = 0;

  elementImpacts.forEach(val => {
    totalImpacts += val;
  });

  return elementImpacts.length > 0 ? Math.round(totalImpacts / elementImpacts.length) : 0;
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
    ? 6 - Math.round(totalAvailability / elementAvailability.length)
    : 0;
};

const getDisabilityOnSecondaryProduction = iranStats => {
  const iranProduction = iranStats.productionValue
    ? iranStats.productionValue
    : 1;

  const iranSecondaryProduction = iranStats.secondaryProductionValue
    ? iranStats.secondaryProductionValue
    : 0;

  const value = iranSecondaryProduction / iranProduction;

  let rate = 5;

  if (value >= 0.1 && value <= 0.2) {
    rate = 1;
  } else if (value >= 0.05 && value < 0.1) {
    rate = 2;
  } else if (value >= 0.01 && value < 0.05) {
    rate = 3;
  } else if (value > 0 && value < 0.01) {
    rate = 4;
  } else if (value === 0) {
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
        T: 0.15,
        En: 0.25,
        L: 0.1
      },
      strategic: {
        P: 0.35,
        E: 0.1,
        S: 0.1,
        T: 0.2,
        En: 0.1,
        L: 0.15
      },
      economic: {
        P: 0.15,
        E: 0.3,
        S: 0.15,
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

    const { analysisFactor, indicatorsFactor } = this.props; console.log("-----analysisFactor---", analysisFactor);

    if (
      prevProps.analysisFactor !== analysisFactor ||
      !_.isEqual(prevProps.indicatorsFactor, indicatorsFactor)
    ) {console.log("----test----", this.props);
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

    console.log('--------statsByElements--------', statsByElements);

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
      
      if (iranStats && iranStats.element === "gold")
      console.log("-----iranStats--IRN--", iranStats);

      if (iranStats && worldStats) {
        p1 = getDependencyToOtherCountry(iranStats, worldStats);
      }

      let p2 = 1;

      if (worldStats && worldStats.importValue && statsByLocation.length > 1) {
        p2 = threatInternationalRelation(
          statsByLocation,
          internationalRelations,
          worldStats
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

        const priceAverage = totalPrice / Object.keys(elements).length;

        e2 = getEconomicValue(gPrice, priceAverage);
      }

      let e3 = 1;

      if (worldStats && iranStats) {
        e3 = getIranConsumption(iranStats, worldStats);
      }

      let e4 = 1;

      if (iranStats) {
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

      let t1 = getTechnplogyRestriction(technologies, element);

      t1 = t1 > 5 ? 5 : t1;

      let t2 = 5;

      if (iranStats) {
        t2 = getDisabilityOnSecondaryProduction(iranStats);
      }

      const environment = environments.find(x => x.element === element);

      let en1 = 1;

      if (environment && environment.waterConsumption) {
        en1 = 6 - getQualityNumber(environment.waterConsumption);
        en1 = en1 > 5 ? 5 : en1;
      }

      let en2 = 1;

      if (environment && environment.energyConsumption) {
        en2 = 6 - getQualityNumber(environment.energyConsumption);
        en2 = en2 > 5 ? 5 : en2;
      }

      let en3 = 1;

      if (environment && environment.greenhouseGasEmissions) {
        en3 = 6 - getQualityNumber(environment.greenhouseGasEmissions);
        en3 = en3 > 5 ? 5 : en3;
      }

      let en4 = 1;

      if (environment && environment.risksWasteAWasteWater) {
        en4 = 6 - getQualityNumber(environment.risksWasteAWasteWater);
        en4 = en4 > 5 ? 5 : en4;
      }

      let en5 = 1;

      if (environment && environment.productionProcessRisksHuman) {
        en5 = 6 - getQualityNumber(environment.productionProcessRisksHuman);
        en5 = en5 > 5 ? 5 : en5;
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
        l3 = 6 - getQualityNumber(threat.levelGovernmentalSupport);
        l3 = l3 > 5 ? 5 : l3;
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

    // console.log('--------elementsRate---gold-------', elementsRate['gold']);

    console.log("---setElementsRatesDis---");

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
          /* onCompleted={data => {
            if (!_.isEqual(data.statsByElements, statsByElements)) {
              this.setState({ statsByElements: data.statsByElements });
            }
          }} */
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data && data.statsByElements) {
              console.log(data);
              if (!_.isEqual(data.statsByElements, statsByElements)) {
                this.setState({ statsByElements: data.statsByElements });
              }
            }

            return null;
          }}
        </Query>

        <Query
          query={GET_INTERNATIONAL_RELATIONS}
          variables={{
            offset: -1,
            first: 0
          }}
          /* onCompleted={data => {
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
          }} */
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data && data.searchInternationalRelations) {
              console.log(data);
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
            }

            return null;
          }}
        </Query>

        <Query
          query={GET_ENVIRONMENTS}
          variables={{
            offset: -1,
            first: 0
          }}
          /* onCompleted={data => {
            if (
              !_.isEqual(data.searchEnvironments.environments, environments)
            ) {
              this.setState({
                environments: data.searchEnvironments.environments
              });
            }
          }} */
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data && data.searchEnvironments) {
              console.log(data);
              if (
                !_.isEqual(data.searchEnvironments.environments, environments)
              ) {
                this.setState({
                  environments: data.searchEnvironments.environments
                });
              }
            }

            return null;
          }}
        </Query>

        <Query
          query={GET_THREATS}
          variables={{
            offset: -1,
            first: 0
          }}
          /* onCompleted={data => {
            if (!_.isEqual(data.searchThreats.threats, threats)) {
              this.setState({ threats: data.searchThreats.threats });
            }
          }} */
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (data && data.searchThreats) {
              console.log(data);
              if (!_.isEqual(data.searchThreats.threats, threats)) {
                this.setState({ threats: data.searchThreats.threats });
              }
            }

            if (error) console.log(error);

            return null;
          }}
        </Query>

        <Query
          query={GET_TECHNOLOGIES}
          variables={{
            offset: -1,
            first: 0
          }}
          /* onCompleted={data => {
            if (
              !_.isEqual(data.searchTechnologies.technologies, technologies)
            ) {
              this.setState({
                technologies: data.searchTechnologies.technologies
              });
            }
          }} */
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data && data.searchTechnologies) {
              console.log(data);
              if (
                !_.isEqual(data.searchTechnologies.technologies, technologies)
              ) {
                this.setState({
                  technologies: data.searchTechnologies.technologies
                });
              }
            }

            return null;
          }}
        </Query>

        <Query
          query={GET_INDUSTRIES}
          variables={{
            offset: -1,
            first: 0
          }}
          /* onCompleted={data => {
            if (!_.isEqual(data.searchIndustries.industries, industries)) {
              this.setState({ industries: data.searchIndustries.industries });
            }
          }} */
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data && data.searchIndustries) {
              console.log(data);
              if (!_.isEqual(data.searchIndustries.industries, industries)) {
                this.setState({ industries: data.searchIndustries.industries });
              }
            }

            return null;
          }}
        </Query>

        <Query
          query={GET_MINES}
          variables={{
            offset: -1,
            first: 0
          }}
          /* onCompleted={data => {
            if (!_.isEqual(data.searchMine.mines, mines)) {
              this.setState({ mines: data.searchMine.mines });
            }
          }} */
        >
          {({ data, loading, error }) => {
            if (loading) return <Loading />;

            if (error) console.error(error);

            if (data && data.searchMine) {
              console.log(data);
              if (!_.isEqual(data.searchMine.mines, mines)) {
                this.setState({ mines: data.searchMine.mines });
              }
            }

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
    p2: 0.1,
    p3: 0.5,
    p4: 0.1,
    e1: 0.1,
    e2: 0.2,
    e3: 0.1,
    e4: 0.15,
    e5: 0.15,
    e6: 0.2,
    e7: 0.1,
    s1: 0.35,
    s2: 0.3,
    s3: 0.35,
    t1: 0.5,
    t2: 0.5,
    en1: 0.3,
    en2: 0.1,
    en3: 0.15,
    en4: 0.15,
    en5: 0.3,
    l1: 0.3,
    l2: 0.2,
    l3: 0.5
  }
};

/* const mapDispatchToProps = dispatch => ({
  setElementsRatesDis: rates => dispatch(setElementsRates(rates))
}); */

export default withRouter(AnalysisRate); /* connect(
  null,
  mapDispatchToProps
)(withRouter(AnalysisRate)); */
