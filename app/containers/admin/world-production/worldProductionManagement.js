import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getCountries,
  getYearOptions
} from '../../../utils/utility';
import List from '../../../components/list-register/List';
import {
  DELETE_ELEMENT_STATS,
  MULTI_DELETE_ELEMENTS_STATS
} from '../../../queries/elementStats';
import { GET_PRODUCTION, GET_PRODUCTIONS } from '../iran-production/query';
import { ELEMENT_STATS_EDIT } from '../../../constants/routes';

export default class ExportManagement extends Component<Props> {
  render() {
    return (
      <div>
        <List
          editRoute={ELEMENT_STATS_EDIT.replace('/:id', '')}
          heading={<FormattedSimpleMsg id="global.productionListWorld" />}
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
              filter: 'location',
              label: 'global.country',
              type: 'select', // text or select
              options: getCountries(),
              isDefault: true,
              default: ''
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
              title: <FormattedMessage id="global.location" />,
              item: dbCol => {
                const value = getCountries('option', dbCol.location);

                return value ? <FormattedSimpleMsg id={value} /> : '';
              }
            },
            {
              key: 'year',
              title: <FormattedMessage id="global.year" />
            },
            {
              key: 'productionValue',
              title: <FormattedMessage id="global.value" />
            },
            {
              key: 'unit',
              title: <FormattedMessage id="global.unit" />
            },
            {
              key: 'description',
              title: <FormattedMessage id="global.description" />
            },
            {
              key: 'username',
              title: <FormattedMessage id="global.username" />
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          indexCol="id"
          keyCol="title"
          titleCol="title"
        />
      </div>
    );
  }
}
