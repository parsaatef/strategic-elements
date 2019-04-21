import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
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

export default class ExportManagement extends Component<Props> {
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
          query={{
            item: {
              gql: GET_ELEMENT_STATS,
              func: 'elementStats'
            },
            register: {
              gql: REGISTER_ELEMENT_STATS,
              func: 'registerElementStats'
            },
            update: {
              gql: UPDATE_ELEMENT_STATS,
              func: 'updateElementStats'
            },
            list: {
              gql: GET_ELEMENTS_STATS,
              func: 'searchElementStats',
              items: 'elementsStats'
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
              label: <FormattedMessage id="global.location" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'year',
              label: <FormattedMessage id="global.year" />,
              type: 'text' // text or select
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'location',
              title: <FormattedMessage id="global.location" />
            },
            {
              key: 'year',
              title: <FormattedMessage id="global.year" />
            },
            {
              key: 'exportValue',
              title: <FormattedMessage id="global.exportValue" />
            },
            {
              key: 'resourceValue',
              title: <FormattedMessage id="global.resourceValue" />
            },
            {
              key: 'productionValue',
              title: <FormattedMessage id="global.productionValue" />
            },
            {
              key: 'consumptionValue',
              title: <FormattedMessage id="global.consumptionValue" />
            },
            {
              key: 'importValue',
              title: <FormattedMessage id="global.importValue" />
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
