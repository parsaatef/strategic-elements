import React, { Component } from 'react';
import * as d3 from 'd3';
import { Query } from 'react-apollo';
import { injectIntl, intlShape } from 'react-intl';
import Loading from '../General/Loading';
import Datamaps from './datamaps';
import World from '../../utils/world.json';
import Iran from '../../utils/iran.json';
import { GET_ELEMENT_MIX_STATS } from '../../queries/elementStats'; // GET_ELEMENTS_STATS,
import popupTemplate from './popupTemplate';
import {
  getQualityLevel,
  getStandardValueByUnit,
  getUnit
} from '../../utils/utility';

// window.d3 = d3;

const CountriesOptions = World.Countries;

const setProjection = null;

const StatesOptions = Iran.States;

export const getPercentValue = (a, b, aUnit, bUnit, formatNumber, raw) => {
  if (!a || !b) {
    return raw ? 0 : `${formatNumber(0)}%`;
  }

  const aSt = getStandardValueByUnit(a, aUnit);

  const bSt = getStandardValueByUnit(b, bUnit);

  const percent = parseFloat((aSt / bSt) * 100).toFixed(2); // Math.round( (aSt/bSt)*100 );

  return raw ? percent : `${formatNumber(percent)}%`;
};

const getFinalValue = (a, unit, formatNumber) => {
  if (!a) {
    return '-';
  }

  const af = formatNumber(a);

  const unitTitle = getUnit('option', unit);

  return `${af} ${unitTitle}`;
};

const irnSetProjection = () => {
  const projectionD3 = d3.geo
    .mercator()
    .center([57.688, 32.4279]) // always in [East Latitude, North Longitude]
    .scale(1400);
  const pathD3 = d3.geo.path().projection(projectionD3);
  return {
    path: pathD3,
    projection: projectionD3
  };
};

class MapInfo extends Component<Props> {
  constructor(props) {
    super(props);

    const { intl } = this.props;

    const { formatMessage } = intl;

    this.labels = {
      locationTitle: formatMessage({ id: 'mapInfo.locationTitle' }),
      primaryProduction: formatMessage({ id: 'mapInfo.primaryProduction' }),
      primaryProductionPercent: formatMessage({
        id: 'mapInfo.primaryProductionPercent'
      }),
      secondaryProduction: formatMessage({ id: 'mapInfo.secondaryProduction' }),
      secondaryProductionPercent: formatMessage({
        id: 'mapInfo.secondaryProductionPercent'
      }),
      resource: formatMessage({ id: 'mapInfo.resource' }),
      resourcePercent: formatMessage({ id: 'mapInfo.resourcePercent' }),
      worldConsumption: formatMessage({ id: 'mapInfo.worldConsumption' }),
      secondarySource: formatMessage({ id: 'mapInfo.secondarySource' }),
      export: formatMessage({ id: 'mapInfo.export' }),
      exportPercent: formatMessage({ id: 'mapInfo.exportPercent' }),
      productionShare: formatMessage({ id: 'mapInfo.productionShare' }),
      iranConsumption: formatMessage({ id: 'mapInfo.iranConsumption' }),
      iranProduction: formatMessage({ id: 'mapInfo.iranProduction' }),
      import: formatMessage({ id: 'mapInfo.import' }),
      importPercent: formatMessage({ id: 'mapInfo.importPercent' }),
      consumptionShare: formatMessage({ id: 'mapInfo.consumptionShare' })
    };
  }

  getFactorsByType() {
    const { type } = this.props;

    let factors = [];

    switch (type) {
      case 'resource':
        factors = [
          'locationTitle',
          'resource',
          'resourcePercent',
          'secondarySource',
          'primaryProduction',
          'primaryProductionPercent',
          'secondaryProduction',
          'secondaryProductionPercent'
        ];
        break;

      case 'export':
        factors = [
          'locationTitle',
          'export',
          'exportPercent',
          'productionShare',
          'worldConsumption',
          'iranConsumption',
          'iranProduction'
        ];

        break;

      case 'import':
        factors = [
          'locationTitle',
          'import',
          'importPercent',
          'consumptionShare',
          'worldConsumption',
          'iranConsumption',
          'iranProduction'
        ];

        break;

      default:
      case 'product':
        factors = [
          'locationTitle',
          'primaryProduction',
          'primaryProductionPercent',
          'secondaryProduction',
          'secondaryProductionPercent',
          'resource',
          'resourcePercent',
          'worldConsumption'
        ];
    }

    return factors;
  }

  getLocationStats(itemData, totalItemData, iranItemData) {
    const { intl, type } = this.props;

    const { formatNumber } = intl;

    const {
      productionValue,
      secondaryProductionValue,
      locationTitle,
      resourceStats,
      exportValue,
      importValue,
      unit
    } = itemData || {};

    /* const {
      productionValue: prevProductionValue,
      secondaryProductionValue: prevSecondaryProductionValue,
      resourceStats: prevResourceStats,
      exportValue: prevExportValue,
      importValue: prevImportValue,
      unit: prevUnit
    } = prevItemData; */

    const {
      productionValue: iranProductionValue,
      consumptionValue: iranConsumptionValue,
      unit: iranUnit
    } = iranItemData || {};

    const {
      productionValue: productionValueTotal,
      secondaryProductionValue: secondaryProductionTotal,
      resourceStats: resourceStatsTotal,
      consumptionValue: consumptionValueTotal,
      exportValue: exportValueTotal,
      importValue: importValueTotal,
      unit: unitTotal
    } = totalItemData || {};

    const { primarySource, unit: unitSource, secondarySource } =
      resourceStats || {};

    const { primarySource: primarySourceTotal, unit: unitSourceTotal } =
      resourceStatsTotal || {};

    const allFactor = {
      locationTitle,

      primaryProduction: getFinalValue(productionValue, unit, formatNumber),

      primaryProductionPercent: getPercentValue(
        productionValue,
        productionValueTotal,
        unit,
        unitTotal,
        formatNumber
      ),

      secondaryProduction: getFinalValue(
        secondaryProductionValue,
        unit,
        formatNumber
      ),

      secondaryProductionPercent: getPercentValue(
        secondaryProductionValue,
        secondaryProductionTotal,
        unit,
        unitTotal,
        formatNumber
      ),

      resource: getFinalValue(primarySource, unit, formatNumber),

      resourcePercent: getPercentValue(
        primarySource,
        primarySourceTotal,
        unitSource,
        unitSourceTotal,
        formatNumber
      ),

      worldConsumption: getFinalValue(
        consumptionValueTotal,
        unit,
        formatNumber
      ),

      secondarySource: secondarySource
        ? getQualityLevel('option', secondarySource)
        : '-',

      export: getFinalValue(exportValue, unit, formatNumber),

      exportPercent: getPercentValue(
        exportValue,
        exportValueTotal,
        unit,
        unitTotal,
        formatNumber
      ),

      productionShare: getPercentValue(
        exportValue,
        iranProductionValue,
        unit,
        iranUnit,
        formatNumber
      ),

      iranConsumption: getFinalValue(iranConsumptionValue, unit, formatNumber),

      iranProduction: getFinalValue(iranProductionValue, unit, formatNumber),

      import: getFinalValue(importValue, unit, formatNumber),

      importPercent: getPercentValue(
        importValue,
        importValueTotal,
        unit,
        unitTotal,
        formatNumber
      ),

      consumptionShare: getPercentValue(
        importValue,
        iranConsumptionValue,
        unit,
        iranUnit,
        formatNumber
      )
    };

    const factors = this.getFactorsByType();

    const finalFactors = {};

    factors.forEach(factorKey => {
      finalFactors[factorKey] = allFactor[factorKey];
    });

    let radius;

    switch (type) {
      case 'source':
        radius = getPercentValue(
          primarySource,
          primarySourceTotal,
          unitSource,
          unitSourceTotal,
          formatNumber,
          true
        );
        break;
      case 'export':
        radius = getPercentValue(
          exportValue,
          exportValueTotal,
          unit,
          unitTotal,
          formatNumber,
          true
        );
        break;
      case 'import':
        radius = getPercentValue(
          importValue,
          importValueTotal,
          unit,
          unitTotal,
          formatNumber,
          true
        );
        break;
      default:
      case 'product':
        radius = getPercentValue(
          productionValue + secondaryProductionValue,
          productionValueTotal,
          unit,
          unitTotal,
          formatNumber,
          true
        );
    }

    finalFactors.radius = radius;

    return finalFactors;
  }

  getBubbleProps(data) {
    const { locationType } = this.props;

    const { labels } = this;

    const { intl } = this.props;

    const LocationOptions =
      locationType === 'iran' ? StatesOptions : CountriesOptions;
    const LocationsType = locationType === 'iran' ? 'state' : 'country';

    const { formatMessage } = intl;

    const LocationData = [];

    const totalItemData = data.find(stats => stats.location === 'all');

    const iranItemData = data.find(stats => stats.location === 'IRN');

    data.forEach(elem => {
      const location = LocationOptions.find(
        cnty => cnty[LocationsType] === elem.location
      );

      if (location) {
        const prevCountry = LocationData.find(
          cnty => cnty[LocationsType] === elem.location
        );

        if (!prevCountry) {
          LocationData.push({
            ...location,
            ...this.getLocationStats(
              {
                ...elem,
                locationTitle: formatMessage({ id: location.title })
              },
              totalItemData,
              iranItemData
            ),
            labels
          });
        }
        // TODO: we need to right solution for category of elements
        /* else {

          const prevCountryIndex = LocationData.findIndex(
            cnty => cnty[LocationsType] === elem.location
          );

          const {
            resourceValue,
            productionValue,
            consumptionValue,
            exportValue,
            importValue,
            secondaryProductionValue,
            radius
          } = prevCountry;

          // .
          LocationData[prevCountryIndex] = {
            ...prevCountry,
            resourceValue: resourceValue + elem.resourceValue,
            productionValue: productionValue + elem.productionValue,
            consumptionValue:
            consumptionValue + elem.consumptionValue,
            exportValue: exportValue + elem.exportValue,
            importValue: importValue + elem.importValue,
            secondaryProductionValue: secondaryProductionValue + elem.secondaryProductionValue,
            radius: radius - 5 + 5
          };

        } */
      }
    });

    return LocationData;
  }

  render() {
    const { locationType, year, elements } = this.props;

    let scopeProps = 'world';
    let idName = 'world-map';
    let widthProps = '80%';
    let heightProps = '65vh';
    let dataUrlProps = null;
    let popupTemplateProps = popupTemplate;
    let setProjectionProps = setProjection;

    if (locationType === 'iran') {
      scopeProps = 'irn';
      idName = 'iran-map';
      widthProps = '85%';
      heightProps = '65vh';
      dataUrlProps = 'components/Information/irn.topo.json';
      popupTemplateProps = popupTemplate;
      setProjectionProps = irnSetProjection;
    }

    return (
      <section className="smfp-datamaps-wrap-outer animated fadeInUp fast delay-2s">
        <Query
          query={GET_ELEMENT_MIX_STATS} // GET_ELEMENTS_STATS}
          variables={{
            // locationType,
            year,
            elements
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (!data || !data.statsByElements) return null;

            const LocationData = this.getBubbleProps(data.statsByElements);
            console.log('------LocationData----', LocationData);

            return (
              <Datamaps
                className="smfp-datamaps-wrap animated fadeIn fast"
                idName={idName}
                widthProps={widthProps}
                heightProps={heightProps}
                scopeProps={scopeProps}
                dataUrlProps={dataUrlProps}
                bubblesProps={LocationData}
                popupTemplateProps={popupTemplateProps}
                setProjectionProps={setProjectionProps}
              />
            );
          }}
        </Query>
      </section>
    );
  }
}

MapInfo.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(MapInfo);
