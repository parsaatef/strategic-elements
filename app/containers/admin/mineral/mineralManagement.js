import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
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
} from '../../../queries/mineral';

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
          listTitle={<FormattedSimpleMsg id="global.mineralList" />}
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
              label: 'global.title',
              type: 'text' // text or select
            },
            {
              filter: 'color',
              label: 'global.color',
              type: 'text' // text or select
            },
            {
              filter: 'elements',
              label: 'global.element',
              type: 'element', // text or select
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
              key: 'formula',
              title: <FormattedMessage id="global.formula" />
            },
            {
              key: 'color',
              title: <FormattedMessage id="global.color" />
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
