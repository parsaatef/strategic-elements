import React, { Component } from 'react';
import List from '../../../components/list-register/List';
import {
  DELETE_ELEMENT_STATS,
  MULTI_DELETE_ELEMENTS_STATS
} from '../../../queries/elementStats';
import { GET_PRODUCTION, GET_PRODUCTIONS } from '../iran-production/query';

export default class ExportManagement extends Component<Props> {
  render() {
    return (
      <div>
        <List
          editRoute="/admin/export/edit"
          heading="Production List"
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
                type: 'production',
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
              label: 'Location',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'year',
              label: 'Year',
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
              title: 'Location'
            },
            {
              key: 'year',
              title: 'Year'
            },
            {
              key: 'productionValue',
              title: 'Value'
            },
            {
              key: 'unit',
              title: 'Unit'
            },
            {
              key: 'description',
              title: 'Description'
            },
            {
              key: 'username',
              title: 'Username'
            },
            {
              key: 'action',
              title: 'Actions'
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
