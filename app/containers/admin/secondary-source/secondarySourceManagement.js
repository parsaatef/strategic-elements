import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_SECONDARY_SOURCE,
  UPDATE_SOURCE,
  REGISTER_SOURCE,
  GET_SECONDARY_SOURCES,
  DELETE_SOURCE,
  MULTI_DELETE_SOURCES
} from './query';

export default class SecondarySourceManagement extends Component<Props> {
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
          registerRoute="/admin/secondary-source/register"
          listRoute="/admin/secondary-sources/list"
          editRoute="/admin/secondary-source/edit"
          listTitle="Global Price List"
          query={{
            item: {
              gql: GET_SECONDARY_SOURCE,
              func: 'secondarySource'
            },
            register: {
              gql: REGISTER_SOURCE,
              func: 'registerSecondarySource'
            },
            update: {
              gql: UPDATE_SOURCE,
              func: 'updateSecondarySource'
            },
            list: {
              gql: GET_SECONDARY_SOURCES,
              func: 'searchSecondarySource',
              items: 'secondarySources'
            },
            remove: {
              gql: DELETE_SOURCE,
              func: 'removeSecondarySource'
            },
            multiRemove: {
              gql: MULTI_DELETE_SOURCES,
              func: 'multiRemoveSecondarySources'
            }
          }}
          filters={[
            {
              filter: 'title',
              label: 'Title',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'description',
              label: 'Description',
              type: 'text' // text or select
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'title',
              title: 'Title'
            },
            {
              key: 'value',
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
