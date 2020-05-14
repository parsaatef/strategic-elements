import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getCountries,
  getLocationType,
  getStates,
  getYearOptions,
  getUnit
} from '../../../utils/utility';
import List from '../../../components/list-register/List';
import {
  DELETE_ELEMENT_STATS,
  MULTI_DELETE_ELEMENTS_STATS
} from '../../../queries/elementStats';
import { GET_PRODUCTION, GET_PRODUCTIONS } from '../iran-production/query';
import { ELEMENT_STATS_EDIT } from '../../../constants/routes';

export default class worldProductionManagement extends Component<Props> {
  render() {
    return (
      <div>
        <List
          editRoute={ELEMENT_STATS_EDIT.replace('/:id', '')}
          heading={<FormattedSimpleMsg id="global.productionListWorld" />}
          icon="smfpIcon smfpIcon-world-production"
          query={{
            item: {
              gql: GET_PRODUCTION,
              func: 'elementStats'
            },
            list: {
              gql: GET_PRODUCTIONS,
              func: 'searchElementStats',
              items: 'elementsStats',
              variables: {
                type: 'productionValue',
                locationType: 'world'
              }
            },
            remove: {
              gql: DELETE_ELEMENT_STATS,
              func: 'removeElementStats'
            },
            multiRemove: {
              gql: MULTI_DELETE_ELEMENTS_STATS,
              func: 'multiRemoveElementStats'
            }
          }}
          filters={[
            {
              filter: 'elements',
              label: 'global.element',
              type: 'element', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'location',
              label: 'global.country',
              type: 'select', // text or select
              options: getCountries()
            },
            {
              filter: 'year',
              label: 'global.year',
              type: 'select', // text or select
              options: getYearOptions(1990, 2030)
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'element',
              title: <FormattedMessage id="global.element" />
            },
            {
              key: 'location',
              title: <FormattedMessage id="global.country" />,
              item: dbCol => {
                const value =
                  dbCol.locationType === 'iran'
                    ? getStates('option', dbCol.location)
                    : getCountries('option', dbCol.location);

                return value && dbCol.locationType === 'iran' ? (
                  <FormattedSimpleMsg id={value} />
                ) : (
                  value
                );
              }
            },
            {
              key: 'year',
              title: <FormattedMessage id="global.year" />
            },
            {
              key: 'productionValue',
              title: <FormattedMessage id="global.primaryProduction" />
            },
            {
              key: 'unit',
              title: <FormattedMessage id="global.unit" />,
              isUnit: true
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            location: dbCol => {
              const value =
                dbCol.locationType === 'iran'
                  ? getStates('option', dbCol.location)
                  : getCountries('option', dbCol.location);

              return value && dbCol.locationType === 'iran' ? (
                <FormattedSimpleMsg id={value} />
              ) : (
                value
              );
            },
            locationType: dbCol =>
              getLocationType('option', dbCol.locationType),
            unit: dbCol => getUnit('option', dbCol.unit)
          }}
          itemsDetailLabels={{
            location: <FormattedMessage id="global.country" />,
            productionValue: <FormattedMessage id="global.primaryProduction" />,
            secondaryProductionValue: (
              <FormattedMessage id="global.secondaryProduction" />
            ),
            consumptionValue: <FormattedMessage id="global.consumption" />,
            exportValue: <FormattedMessage id="global.exportValueToIran" />,
            importValue: <FormattedMessage id="global.importValueFromIran" />,
            locationType: <FormattedMessage id="global.scale" />
          }}
          indexCol="id"
          keyCol="id"
          titleCol="element"
        />
      </div>
    );
  }
}
