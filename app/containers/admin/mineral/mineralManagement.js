import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_MINERAL,
  UPDATE_MINERAL,
  REGISTER_MINERAL,
  GET_MINERALS,
  DELETE_MINERAL,
  MULTI_DELETE_MINERALS
} from './query';

export default class MineralManagement extends Component<Props> {
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
          registerRoute="/admin/mineral/register"
          listRoute="/admin/minerals/list"
          editRoute="/admin/mineral/edit"
          listTitle="Mineral List"
          query={{
            item: {
              gql: GET_MINERAL,
              func: 'mineral'
            },
            register: {
              gql: REGISTER_MINERAL,
              func: 'registerMineral'
            },
            update: {
              gql: UPDATE_MINERAL,
              func: 'updateMineral'
            },
            list: {
              gql: GET_MINERALS,
              func: 'searchMineral',
              items: 'minerals'
            },
            remove: {
              gql: DELETE_MINERAL,
              func: 'removeMineral'
            },
            multiRemove: {
              gql: MULTI_DELETE_MINERALS,
              func: 'multiRemoveMinerals'
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
              filter: 'color',
              label: 'Color',
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
              key: 'title',
              title: 'Title'
            },
            {
              key: 'formula',
              title: 'Formula'
            },
            {
              key: 'color',
              title: 'Color'
            },
            {
              key: 'username',
              title: 'Username'
            },
            {
              key: 'elements',
              title: 'Elements'
            },
            {
              key: 'action',
              title: 'Actions'
            }
          ]}
          indexCol="id"
          keyCol="mineral"
          titleCol="title"
        />
      </div>
    );
  }
}
