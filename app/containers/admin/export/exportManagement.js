import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
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
          registerRoute="/admin/export/register"
          listRoute="/admin/export/list"
          editRoute="/admin/export/edit"
          listTitle="Export List"
          query={{
            item: {
              gql: GET_ELEMENT_STATS,
              func: 'elementStats',
              variables: {
                type: 'export'
              }
            },
            register: {
              gql: REGISTER_ELEMENT_STATS,
              func: 'registerElementStats',
              variables: {
                type: 'export'
              }
            },
            update: {
              gql: UPDATE_ELEMENT_STATS,
              func: 'updateElementStats',
              variables: {
                type: 'export'
              }
            },
            list: {
              gql: GET_ELEMENTS_STATS,
              func: 'searchElementStats',
              items: 'elementsStats',
              variables: {
                type: 'export'
              }
            },
            remove: {
              gql: DELETE_ELEMENT_STATS,
              func: 'removeElementStats',
              variables: {
                type: 'export'
              }
            },
            multiRemove: {
              gql: MULTI_DELETE_ELEMENTS_STATS,
              func: 'multiRemoveElementStats',
              variables: {
                type: 'export'
              }
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
              key: 'exportValue',
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
