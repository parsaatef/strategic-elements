import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
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
          listTitle={<FormattedSimpleMsg id="global.minesList" />}
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
              label: <FormattedSimpleMsg id="global.title" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'activeMines',
              label: <FormattedSimpleMsg id="global.activeMines" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'productionValue',
              label: <FormattedSimpleMsg id="global.production" />,
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
              title: <FormattedMessage id="global.title" />
            },
            {
              key: 'activeMines',
              title: <FormattedMessage id="global.value" />
            },
            {
              key: 'productionValue',
              title: <FormattedMessage id="global.production" />
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
