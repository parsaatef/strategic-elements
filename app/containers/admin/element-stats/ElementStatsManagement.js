import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getYearOptions,
  getLocationType,
  getCountries,
  getStates,
  getUnit
} from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import {
  ELEMENT_STATS_REGISTER,
  ELEMENTS_STATS_LIST,
  ELEMENT_STATS_EDIT
} from '../../../constants/routes';
import ElementForm from './form';
import schema from './schema';
import {
  GET_ELEMENT_STATS,
  UPDATE_ELEMENT_STATS,
  REGISTER_ELEMENT_STATS,
  GET_ELEMENTS_STATS,
  DELETE_ELEMENT_STATS,
  MULTI_DELETE_ELEMENTS_STATS
} from '../../../queries/elementStats';

export default class ElementStatsManagement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={ElementForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={ELEMENT_STATS_REGISTER}
          listRoute={ELEMENTS_STATS_LIST}
          editRoute={ELEMENT_STATS_EDIT.replace('/:id', '')}
          listTitle={<FormattedSimpleMsg id="global.elementsStatsList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-element-stats"
          query={{
            item: {
              gql: GET_ELEMENT_STATS,
              func: 'elementStats'
            },
            register: {
              gql: REGISTER_ELEMENT_STATS,
              func: 'registerElementStats',
              variables: {
                locationType: 'world'
              }
            },
            update: {
              gql: UPDATE_ELEMENT_STATS,
              func: 'updateElementStats',
              variables: {
                locationType: 'world'
              }
            },
            list: {
              gql: GET_ELEMENTS_STATS,
              func: 'searchElementStats',
              items: 'elementsStats',
              variables: {
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

            /*
            {
              filter: 'locationType',
              label: 'global.locationType',
              type: 'select', // text or select
              options: getLocationType()
            },
            {
              filter: 'location',
              label: 'global.state',
              type: 'select', // text or select
              options: getStates()
            } */
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
              key: 'secondaryProductionValue',
              title: <FormattedMessage id="global.secondaryProduction" />
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
