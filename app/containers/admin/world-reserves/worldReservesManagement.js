import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import List from '../../../components/list-register/List';
import {
  DELETE_ELEMENT_STATS,
  MULTI_DELETE_ELEMENTS_STATS
} from '../../../queries/elementStats';
import { GET_RESOURCE, GET_RESOURCES } from '../iran-reserves/query';

export default class ExportManagement extends Component<Props> {
  render() {
    return (
      <div>
        <List
          editRoute="/admin/export/edit"
          heading={<FormattedSimpleMsg id="global.resourceListWorld" />}
          query={{
            item: {
              gql: GET_RESOURCE,
              func: 'elementStats'
            },
            list: {
              gql: GET_RESOURCES,
              func: 'searchElementStats',
              items: 'elementsStats',
              variables: {
                type: 'resource',
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
              label: 'global.location',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'year',
              label: 'global.year',
              type: 'text', // text or select
              isDefault: true,
              default: ''
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
              key: 'resourceValue',
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
