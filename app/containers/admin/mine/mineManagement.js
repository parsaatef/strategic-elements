import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_MINE,
  UPDATE_MINE,
  REGISTER_MINE,
  GET_MINES,
  DELETE_MINE,
  MULTI_DELETE_MINES
} from './query';

export default class MineManagement extends Component<Props> {
  render() {
    const { match } = this.props;
    console.log('-------this.props----', this.props);

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={ElementForm}
          schema={schema}
          hasElementTab={false}
          registerRoute="/admin/mine/register"
          listRoute="/admin/mines/list"
          editRoute="/admin/mine/edit"
          listTitle="Mines List"
          query={{
            item: {
              gql: GET_MINE,
              func: 'mine'
            },
            register: {
              gql: REGISTER_MINE,
              func: 'registerMine'
            },
            update: {
              gql: UPDATE_MINE,
              func: 'updateMine'
            },
            list: {
              gql: GET_MINES,
              func: 'searchMine',
              items: 'mines'
            },
            remove: {
              gql: DELETE_MINE,
              func: 'removeMine'
            },
            multiRemove: {
              gql: MULTI_DELETE_MINES,
              func: 'multiRemoveMines'
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
              filter: 'activeMines',
              label: 'Active Mines',
              type: 'text' // text or select
            },
            {
              filter: 'productionValue',
              label: 'Production',
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
              key: 'activeMines',
              title: 'Active Mines'
            },
            {
              key: 'productionValue',
              title: 'Production'
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
